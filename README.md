# Practice 3. UI Testing

Автоматизация UI тестирования сайта [demoqa.com](https://demoqa.com/) с использованием **Playwright**.

---

## Цель проекта

Данный проект предназначен для автоматизации тестирования пользовательского интерфейса следующих страниц:

- [Alerts](https://demoqa.com/alerts) — проверка всех типов alert-ов.
- [Practice Form](https://demoqa.com/automation-practice-form) — заполнение обязательных полей и проверка результата.
- [Text Box](https://demoqa.com/text-box) — заполнение формы случайными данными и проверка вывода.
- [Tool Tips](https://demoqa.com/tool-tips) — наведение на элементы и проверка текста tooltip-ов.
- [Select Menu](https://demoqa.com/select-menu) — выбор опций из всех доступных списков.

---

## Используемые технологии

- Playwright
- Faker
- TypeScript
- GitHub Actions — CI/CD
- Playwright HTML Report 
- Скриншоты при ошибках

---

## Структура проекта

```bash
.
├── pageObject/       # Page Object Model (POM)
├── tests/            # Тестовые сценарии
├── playwright-report/ # Автоматически генерируемые отчеты после запуска
├── playwright.config.ts
└── README.md         # Документация проекта

```



##  Установка

Клонировать репозиторий:

```bash
git clone https://github.com/iolanta-pushchayenka/tetsing_js.git
cd tetsing_js

```

Установить зависимости:

```bash
npm install

```

## Запуск тестов

Запуск всех тестов:

```bash

npx playwright test tests
```

Запуск отдельного теста:

```bash

npx playwright test tests/alerts.spec.ts
npx playwright test tests/form.spec.ts
npx playwright test tests/text-box.spec.ts
npx playwright test tests/tool-tips.spec.ts
npx playwright test tests/select-menu.spec.ts

```

## Отчеты

После выполнения тестов:

- Результаты можно найти в папке playwright-report.

- При падении тестов автоматически сохраняются скриншоты.

### Открыть HTML-отчет:

```bash
npx playwright show-report

