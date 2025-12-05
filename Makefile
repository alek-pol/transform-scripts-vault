.PHONY: help test lint lint-fix validate clean

help:
	@echo "Transform Scripts Vault — available commands"
	@echo "  make test      Run all tests"
	@echo "  make lint      Lint source code with ESLint"
	@echo "  make lint-fix  Auto-fix fixable issues"
	@echo "  make validate  Run linter and tests"
	@echo "  make clean     Remove temporary files (if any)"

test:
	@echo " Running tests..."
	npm test

lint:
	@echo " Linting code (ESLint)..."
	npm run lint

lint-fix:
	@echo "️  Auto-fixing code..."
	npm run lint:fix

validate: lint test
	@echo " All checks passed!"

clean:
	@echo " Cleaning up..."
	rm -rf coverage/ tmp/ *.log
