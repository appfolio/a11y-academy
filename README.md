# Developing for Accessibility

This repository covers the content for the Developing for Accessibility academy session.

This app is built on top of [Create React App](https://create-react-app.dev) and [Reactstrap](http://reactstrap.github.io/)

## 🏅 #Goals/Learning Outcomes

- Learn guiding principles for developing for accessiblity
  - Use accessible HTML
  - Use a pattern/component library so it's easy to be consistently accessible
  - Use automated tools to test the accessibility of your app
  - Manually audit your site because automated tools can't catch everything 😅
- Learn how to use automated tools for developing accessible apps
  - Static code analysis
  - Automated tests
  - Browser extensions
- Learn to fix common accessibility mistakes

## 🚀 Starting the project

The `fixme` branch has a bunch of accessibility violations to fix.

```
git checkout fixme
```

### Install dependencies

```
npm install
```

### Start the app

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### Run the linter

```
npm run lint
```

### Run tests

This project uses [axe-core](https://github.com/dequelabs/axe-core) to automate accessibility testing.

```
npm test
```

## ⚠️ Fixing Violations

- [Page Title](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)
- [Cards](https://inclusive-components.design/cards/)
- [Skip navigation links](https://webaim.org/techniques/skipnav/)
  - [Bootstrap screeen reader utilities](https://getbootstrap.com/docs/4.3/utilities/screen-readers/)
- [Button](http://w3c.github.io/aria-practices/#button) - don't add click handlers to `<div>`s - just use a button 🙂
- [Link](http://w3c.github.io/aria-practices/#link) - great for navigating to another page or to a section of the current page. Links != buttons
- [Main landmark](http://w3c.github.io/aria-practices/#aria_lh_main)
- [Forms](http://w3c.github.io/aria-practices/#aria_lh_form)
  - `<label>`
    - Placeholders are not labels
    - `<label>` and `<input>` need to be siblings because of [Bootstrap](https://getbootstrap.com/docs/4.0/components/forms/#checkboxes-and-radios)
  - [Grouping items in select elements](https://www.w3.org/WAI/tutorials/forms/grouping/#grouping-items-in-select-elements)
- [Disclosure](http://w3c.github.io/aria-practices/#disclosure) - an element for showing and hiding text
- [Tooltips](http://w3c.github.io/aria-practices/#tooltip)
- [Tables](http://w3c.github.io/aria-practices/#table)
  - main focus is using semantic HTML
- [Images](https://www.w3.org/WAI/tutorials/images/)
- [Page Language](https://www.w3.org/TR/WCAG20-TECHS/H57.html)
- [aria-hidden](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden)

## 🎓 Resources

### Learn More

- [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Web Content Accessibility (WCAG) Guidelines 2.1](https://www.w3.org/TR/WCAG21/)
- [Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/)
- [a11y project](https://a11yproject.com)

### Browser Tools/Extensions

- [axe](https://www.deque.com/axe/) (Chrome, Firefox)
- [WAVE Browser Extensions](https://wave.webaim.org/extension/) (Chrome, Firefox)
- [Accessibility Insights](https://accessibilityinsights.io) (Chrome)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/) (built into Chrome)
- [Web Inspector Audits](https://webkit.org/blog/8935/audits-in-web-inspector/) (built into Safari Technology Preview)

### Development

- [eslint-plulgin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) - ESLint plugin for accessibility rules on JSX elements
- [axe-core](https://github.com/dequelabs/axe-core) - an accessibility testing engine

### Other libraries

- [@reach/router](https://reach.tech/router) - A client side router that automatically manages focus
- [React Testing Libary](https://testing-library.com/docs/react-testing-library/intro) - a general purpose testing library for React (replacement for Enzyme) with accessibility as a first class concern

### Other Stuff

- [VoiceOver Keyboard Shortcuts on a Mac](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)

This project was inspired by Marcy Sutton's [Empathy Driven Development](https://github.com/marcysutton/empathy-driven-development) project and her [talk at JSConf EU 2018](https://www.youtube.com/watch?v=l95VFLj3e2w).
