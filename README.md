## Time doctor dashboard prototype

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)

### React/Redux experiments

This is an experimental project to getting hands dirty with [ReactDND](https://github.com/react-dnd/react-dnd).
ReactDND enables creating very complex drag and drop applications. Although there is a lot of setup code, once you understand the
core, you'll the appreciate the flexibility.

### Problem statement
The purpose of the task is to develop simplified dashboard with an analytics widget management interface that
allows the end-user to:
- Add / remove 1 widget type
- The ability to drag and drop the widget over the dashboard and drop it into a grid
- The ability to open the settings screen of that widget
- The ability to change one of the settings of that widget

----

## TODO
- Add tests (I know this is silly, but I was short of time)
- Integrate storybook

----

### Table of contents

- [Time doctor dashboard prototype](#time-doctor-dashboard-prototype)
    - [React/Redux experiments](#reactredux-experiments)
    - [Problem statement](#problem-statement)
- [TODO](#todo)
    - [Table of contents](#table-of-contents)
    - [Usage](#usage)
    - [Redux](#redux)
    - [Using Redux DevTools](#using-redux-devtools)
    - [Project structure](#project-structure)
    - [Application source code](#application-source-code)
    - [What I loved most](#what-i-loved-most)
    - [Scope for improvement](#scope-for-improvement)

---

### [Usage](#usage)

**This project uses node version 8. It is advisable to use [nvm](https://github.com/creationix/nvm). Project root contains `.nvmrc` file.**

- Install dependencies: `yarn install`
- Start development server: `yarn run start`
- Create a production build: `yarn run build`
- Run Test cases: `yarn run test`

---


### [Redux](#redux)

I have used REDUX for state management. This allows for a single source of truth about application state. As there is scope for functionality addition which will require the state to be maintained at the application level, this is good to have added in this project.


### [Using Redux DevTools](#using-dev-tools)

[Redux Devtools](https://github.com/gaearon/redux-devtools) is enabled by default in development.

- <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
- <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If you have the
[Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will automatically be used on the client-side instead.

DevTools are not enabled during production.



### [Project structure](#project-structure)

```

├── public
│   ├── user-avatars
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── Types
│   │   └── index.js
│   ├── commons
│   │   ├── assets
│   │   │   ├── icons
│   │   │   │   └── save.svg
│   ├── components
│   │   ├── DashboardHeader
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── UserActivityWidgetDescription
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── UserBlock
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── UserWidgetHeader
│   │   │   ├── icons
│   │   │   │   ├── down.svg
│   │   │   │   └── settings.svg
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── UserWidgetSettings
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── UserWidgetSettingsHeader
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── WidgetContainer
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── WidgetCreationModal
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   └── index.js
│   ├── containers
│   │   ├── App
│   │   │   └── index.js
│   │   ├── Home
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── UserActivityWidget
│   │   │   ├── data.json
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   └── index.js
│   ├── reducers
│   │   ├── index.js
│   │   ├── userWidget.js
│   │   └── widgetContainer.js
│   ├── App.test.js
│   ├── index.js
│   ├── index.scss
│   ├── logo.svg
│   ├── registerServiceWorker.js
│   └── store.js
├── .eslintrc
├── .gitignore
├── .nvmrc
├── LICENSE
├── README.md
├── package.json
└── yarn.lock
```

### [Application source code](#aps)

- Redux instantiation occurs in `src/store.js`
- Reducers should reside in `src/reducers`
- Containers/Stateful components should have a directory inside `src/containers`. Expose the default container using index.js file inside the folder
- Dumb/fully controlled components should have a directory inside `src/components/`
- All the static assets used by components/containers should be contained inside their respective directories. This is done to isolate their assets and dependencies

---

### [What I loved most](#What-I-loved-most)

- Creating dropable grids using [ReactDnd](https://github.com/react-dnd/react-dnd)
- Creating draggable dashboard widgets

### [Scope for improvement](#scope-for-improvement)
- Pass data to widgets instead of loading
- Number of grids should be dynamic
- Better UX for state buttons such as save button in add dashboard option
