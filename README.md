# React Custom Components Library

A modern, customizable React component library with TypeScript support.

## ✨ Features
- **Reusable UI components**: Button, Modal, Checkbox, Switch, Select, TextField
- **TypeScript support**
- **Customizable via props and CSS modules**
- **Accessible and tested**
- **Supports React 17, 18, 19**

## 📦 Installation

```
npm install react-custom-components-lib
```

or

```
yarn add react-custom-components-lib
```

## ⚡ Usage

```tsx
import { Button, Modal, Checkbox, Switch, Select, TextField } from 'react-custom-components-lib';

export function Example() {
  return (
    <Button color="primary" onClick={() => alert('Clicked!')}>
      Click me
    </Button>
  );
}
```

## 🧩 Components

### Button
- `variant`: 'text' | 'contained' | 'outlined'
- `color`: 'inherit' | 'primary' | 'secondary' | 'success' | 'error'
- `size`: 'small' | 'medium' | 'large'
- `disabled`, `onClick`, `children`, `classes`

### Modal
- `isOpen`, `onClose`, `title`, `children`, `footer`, `size`, `position`, `showCloseButton`, `showOverlay`, etc.

### Checkbox
- `checked`, `onChange`, `label`, `description`, `error`, `size`, `color`, `disabled`, `className`

### Switch
- `checked`, `onChange`, `label`, `description`, `error`, `size`, `color`, `disabled`, `className`

### Select
- `options`, `value`, `onChange`, `label`, `placeholder`, `disabled`, `error`, `helperText`, `size`, `className`

### TextField
- `id`, `label`, `placeHolder`, `variant`, `color`, `disabled`, `helperText`, `onChange`, `classes`

## 🛠️ Development & Testing

- **Run Storybook:**
  ```
  npm run storybook
  ```
- **Run tests:**
  ```
  npm test
  ```
- **Lint & format:**
  ```
  npm run lint
  npm run format
  ```

## 🤝 Contributing
Pull requests and issues are welcome! Please open an issue to discuss your idea or bug before submitting a PR.

## 📄 License
MIT 