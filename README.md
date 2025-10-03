# AbrysReactRepo

React Material-ui custom web components

## Installation

> npm i --save @material-ui/pickers @material-ui/core @material-ui/lab @abrystech/abrysreactrepo

After Instalation, we must initiate englobityTheme.

Create your own styles in your root project

> styles/color.styles.js

```js
export const color = {
	basic: {
		brightest: '',
		brighter: '',
		bright: '',
		normal: '',
		semidark: '',
		dark: '',
		darker: '',
	},
	primary: {
		dark: '',
		light: '',
		main: '',
	},
	secondary: {
		dark: '',
		light: '',
		main: '',
	},
	action: {
		error: '',
		activeButton: '',
	},
};
```

> styles/globals.styles.js

```js
import { color } from './color.styles';

export const globals = {
	html: {
		fontSize: '',
	},
	body: {
		backgroundColor: color.secondary.main,
	},
};
```

And use methon `createEnglobaMaterialTheme` to define the Theme

> styles/index.js

```js
import { color } from './color.styles';
import { globals } from './globals.styles';
import { createEnglobaMaterialTheme } from '@engloba-tech/englobity';

// create material engloba theme
const fontFamily = ['Poppins', 'Roboto'].join(',');
const theme = createEnglobaMaterialTheme(color, globals, fontFamily);

export default theme;
```

This theme, you must instanciate at your index.js

> index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import globalStyles from './styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

[. . .]

ReactDOM.render(
  <ThemeProvider theme={globalStyles}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
document.getElementById('root'));
```

## More def information

- [How to run it Localy](https://github.com/Engloba-Tech/englobity/readme/runItLocally.md)
- [How to publish new version](https://github.com/Engloba-Tech/englobity/readme/publishIt.md)
