import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLATFORMS = ['unf', 'ca', 'erp', 'ut', 'ea'];
const ACTIONS = ['list', 'get', 'create', 'update', 'delete'];

function usage() {
  console.log(`
Usage: node tools/generate.js [options]

Options:
  --group <name>        Group (e.g., organizations, nomenclature)
  --platform <name|all> Platform: unf, ca, erp, ut, ea, or "all"
  --action <name>       Action base name (e.g., organizations)
  --type <list|get|create|update|delete>  Operation type (default: list)
  --proxy               Add "_v" suffix in script name and inputKey
  --output-key <name>   Custom output key (e.g., "listDocuments")
  --input-operation <name>    Input operation key (e.g., "Document_ПеремещениеТоваров")

Examples:
  node tools/generate.js --group organizations --platform unf --action organizations --type list --input-operation Catalog_Организации
  node tools/generate.js --group documents --platform all --action production --type get --input-operation Document_СборкаЗапасов --proxy 
`);
  process.exit(1);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1];
      if (value && !value.startsWith('--')) {
        options[key] = value;
        i++;
      } else {
        options[key] = true;
      }
    }
  }

  return options;
}

function renderTemplate(content, vars) {
  return content.replace(/{{(\w+)}}/g, (_, key) => vars[key] || `{{${key}}}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getPluralForm(singular) {
  if (singular.endsWith('y')) {
    return singular.slice(0, -1) + 'ies';
  }
  return singular + 's';
}

function main() {
  const opts = parseArgs();

  const group = opts.group;
  const platformInput = opts.platform;
  const actionBase = opts.action || opts.group;
  const type = opts.type || 'list';
  const customOutputKey = opts['output-key'];
  const inputOperation = opts['input-operation'];
  const isProxy = opts.proxy !== undefined;

  if (!group || !platformInput || !actionBase || !inputOperation) {
    console.error('Error: Missing required arguments');
    usage();
  }

  if (!ACTIONS.includes(type)) {
    console.error(`Error: Invalid type: ${type}. Must be one of: ${ACTIONS.join(', ')}`);
    process.exit(1);
  }

  let platforms = [];
  if (platformInput === 'all') {
    platforms = [...PLATFORMS];
  } else if (PLATFORMS.includes(platformInput)) {
    platforms = [platformInput];
  } else {
    console.error(`Error: Invalid platform: ${platformInput}. Must be one of: ${PLATFORMS.join(', ')} or "all"`);
    process.exit(1);
  }

  // const actionName = type === 'list' ? `list_${actionBase}` : `${type}_${actionBase}`;
  const outputKey = customOutputKey || (type === 'list' ? getPluralForm(actionBase) : actionBase);

  for (const plat of platforms) {
    const platformPart = isProxy ? `${plat}_v` : plat;
    const scriptName = `${platformPart}_${type}_${actionBase}`;
    const inputKey = `${plat}_${type}_${inputOperation}`;

    const vars = {
      group,
      platformPart,
      platform: plat,
      action: actionBase,
      type,
      scriptName,
      inputKey,
      outputKey,
    };

    // --- Generate scripts ---
    const scriptsDir = path.join(__dirname, '..', 'scripts', group);
    ensureDir(scriptsDir);

    for (const direction of ['request', 'response']) {
      const tplPath = path.join(__dirname, '..', 'templates', `script_${direction}.js.tpl`);
      const content = fs.readFileSync(tplPath, 'utf8');
      const rendered = renderTemplate(content, vars);
      const outputPath = path.join(scriptsDir, `${scriptName}_${direction}.js`);
      fs.writeFileSync(outputPath, rendered);
      console.log(`Created script: ${outputPath}`);
    }

    // --- Generate test ---
    const testDir = path.join(__dirname, '..', 'tests', 'spec', group);
    ensureDir(testDir);
    const testTpl = fs.readFileSync(path.join(__dirname, '..', 'templates', 'test.js.tpl'), 'utf8');
    const testContent = renderTemplate(testTpl, vars);
    const testPath = path.join(testDir, `${scriptName}.test.js`);
    fs.writeFileSync(testPath, testContent);
    console.log(`Created test: ${testPath}`);

    // --- Generate fixtures ---
    const fixtureBase = path.join(__dirname, '..', 'tests', 'fixtures', group, scriptName);
    for (const direction of ['request', 'response']) {
      const fixtureDir = path.join(fixtureBase, direction);
      ensureDir(fixtureDir);

      for (const file of ['DATA.json', 'expected.DATA.json']) {
        const tplFile = path.join(__dirname, '..', 'templates', 'fixture', direction, `${file}.tpl`);
        let content = '{}';
        if (fs.existsSync(tplFile)) {
          content = fs.readFileSync(tplFile, 'utf8');
          content = renderTemplate(content, vars);
        }
        fs.writeFileSync(path.join(fixtureDir, file), content);
      }
      console.log(`Created fixtures for ${direction} (${plat})`);
    }
  }

  console.log('\nGeneration complete.');
}

main();
