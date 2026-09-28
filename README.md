# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Профилирование производительности (React DevTools)

### Скриншот 1: До оптимизации — ререндер всех TaskCard при смене фильтра
![FilterButtonsRerender](src\assets\images\FilterButtonsRerender.png)

**Что видно:** При переключении фильтров все компоненты FilterButton ререндеряться т.к. произошласмена состояний и компоненты не мемоизированны.

### Скриншот 2: После оптимизации — мемоизация работает при удалении
![MemoTask](src\assets\images\memoTask.png)

**Что видно:** При удалении задачи перерисовывается только `TaskList` и удалённый `TaskCard`. Оставшиеся `TaskCard` — **серые полосы (did not render)**. Мемоизация сработала: `React.memo` + стабильный `useCallback` для `removeTask`.

### Что улучшили
- Убраны лишние ререндеры `TaskCard` при смене фильтра
- Стабильные ссылки на колбэки (`removeTask`, `setFilter`)
- Мемоизация вычислений (`filteredTasks` через `useMemo`)


