# Transform Scripts Vault

Репозиторий js-скриптов трансформации данных, используемых [**сервисом внешнего взаимодействия Connect
**](https://ekzo.dev/service/connect) для преобразования запросов и ответов между:

- внешними системами (через единый GraphQL/REST интерфейс),
- конфигурациями 1С:
    - unf — 1C:Управление нашей фирмой
    - ca — 1C:Комплексная автоматизация
    - erp — 1C:ERP Управление предприятием
    - ut — 1C:Управление торговлей
    - ea — 1C:Бухгалтерия

Основная задача — обеспечить создание, отладку и хранение копий скриптов трансформации.

---

## Архитектура

### Требования к скриптам

Каждый скрипт — **JS-файл**, который:

- **Не использует** `import`, `export`, `require`, модули.
- Предполагает наличие двух входных параметров (доступных как глобальные переменные в теле скрипта):
    - `DATA` — входные данные (тело запроса или ответа),
    - `CONTEXT` — контекст выполнения (только для чтения).
- **Возвращает новое значение** `DATA` с помощью мутации или `return`.
  Например:

```js
if (!CONTEXT.success) {
  return DATA; // оставить данные без изменений
}
DATA = {listOrgs: DATA.unf_list_Catalog_Организации};
// ИЛИ
return {listOrgs: DATA.unf_list_Catalog_Организации};
```

- Если скрипт **ничего не возвращает** (`undefined`), сервис Connect оставляет исходный `DATA` без изменений.
- Скрипт выполняется как тело функции (DATA, CONTEXT) => { ... }, поэтому конструкция return допустима.

### Структура файлов

```
scripts/
├── {group}/
│   └── {platform}_v_{action}_{direction}.js
└── ...
```

- `{group}` — бизнес-сущность: `organizations`, `nomenclature`, `production`, и т.д.
- `{platform}` — код конфигурации 1С:
    - `unf` — УНФ
    - `ca`  — КА
    - `erp` — УП
    - `ut`  — УТ
    - `ea`  — БП
- `{action}` — назначение: `list_organizations`, `list_nomenclatures`, и т.п.
- `{direction}` — направление трансформации:
    - `request` — преобразование входящего запроса от сервиса Connect перед отправкой в 1С.
    - `response` — преобразование ответа от 1С перед возвратом клиенту через Connect.

**Пример:**

- scripts/organizations/unf_v_list_organizations_response.js — скрипт, который трансформирует ответ от УНФ при запросе
  списка организаций.

**Примечание:**

- Финальные файлы в `scripts/` всегда должны быть самодостаточными.

## Тестирование

### Фикстуры

Тестовые данные хранятся в:

```
tests/fixtures/{group}/{script_name}/
├── request/
│   ├── DATA.json
│   ├── CONTEXT.json # опционально (по умолчанию {})
│   └── expected.DATA.json - ожидаемое значение объекта DATA после трансформации.
└── response/
    ├── DATA.json
    ├── CONTEXT.json # опционально (по умолчанию {"success": true})
    └── expected.DATA.json
```

### Тесты

Написаны на **Jest** в RSpec-стиле:

```js
describe('unf_v_list_organizations.js', () => {
  describe('response transformation', () => {
    it('maps to unified listOrgs format', () => {
      const {DATA, CONTEXT, expected} = loadFixture('organizations', 'unf_v_list_organizations', 'response');
      const result = runTransformScript(scriptPath('organizations', 'unf_v_list_organizations', 'response'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });
  });
});
```

## Разработка

### Установка

```bash
npm install
```

### Команды

- `make test` - Запуск всех тестов
- `make lint` - Проверка кода (ESLint)
- `make lint-fix` - Автоисправление стиля
- `make validate` - Полная проверка (lint + test)
- `npm run test:watch` - Режим наблюдения (для TDD)

### Правила именования

- Все скрипты — строчные, с разделителем `_`.
- Группы — во множественном числе: `organizations`, а не `organization`.
- Названия отражают бизнес-сущность, а не техническую реализацию.

### TODO-комментарии

Используйте `// TODO:` для отметки дублирующей логики:

```js
// TODO: аналогично в ca_v_list_organizations.js — обновить при изменении
```

## Зависимости

- Node.js ≥18 (ES Modules)
- Jest ≥29 — тестирование
- ESLint ≥9 — линтинг в flat config формате

### Конфигурации:

- `jest.config.js` — настройка тестового окружения
- `eslint.config.js` — правила линтинга (включая игнорирование каталога scripts/)
