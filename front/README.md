## Настройка _NODE_PATH_ для ESlint и Prettier в vscode _(и не только)_

Перейдите в директорию `hh-gowork/front`, поднимите зависимости командой `yarn`
(Если вы пользуетесь **IDE JetBrains**, то после этого шага все готово к работе*)
и установите [Editor SDKs](https://yarnpkg.com/getting-started/editor-sdks):

1. Для **vscode** командой `yarn pnpify --sdk vscode`;
2. Для **vim** командой `yarn pnpify --sdk vim`.

Далее в **vscode** придется кое-что настроить...
Поскольку папки _node_modules_ _нет_, то теперь параметр `NODE_PATH` со значением по умолчанию бесполезен.

Для решения этой _проблемы_ в директории `hh-gowork/front` репозитория есть папка **.vscode**

Дальше есть два варианта развития событий:
1. Если Вы открыли в редакторе кода в виде проекта корневую директорию репозитория и будете в ней работать,
   то необходимо в нее переместить папку **.vscode** и привести файл `.vscode/settings.json` к такому виду:
```
{
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "eslint.nodePath": "front/.yarn/sdks",
  "prettier.prettierPath": "front/.yarn/sdks/prettier/index.js"
}
```

2. Если Вы открыли в редакторе кода в виде проекта директорию `hh-gowork/front`, то менять ничего не надо.

**НО** если Редактор автоматически не подцепит новый путь, его надо указать вручную:

````
Press F1 -> ESLint: Select Node Path -> front/.yarn/sdk [Use NODE_PATH value defined vai settings]
````

И перезапустите `ESLint Server`:

````
Press F1 -> ESLint: Restart ESLint Server
````

Для _других_ редакторов кода или IDE может потребоваться _особенная_ настройка,
об этом можно узнать в официальной документации [Editor SDKs](https://yarnpkg.com/getting-started/editor-sdks)

## Развертывание приложения в контейнере Docker

### Подготовка

Скачайте, установите и запустите (для Windows и Mac) `Docker`.

Официальная документация [Getting started](https://docs.docker.com/get-started/).

### Сборка образа

Перейдите в директорию `hh-gowork/front/`, где находится `Dockerfile`, и выполните следующую команду, чтобы собрать Docker-образ:

```
docker build -t hh-gowork/front .
```

Флаг `-t` позволяет поставить тэг к вашему образу, чтобы его позже было проще найти при помощи команды `docker images`.

Официальная документация [docker build](https://docs.docker.com/engine/reference/commandline/build/).

Собранный образ теперь будет отображаться в списке всех образов.

### Запуск образа

Следующая команда создает и запускает контейнер на основе созданного с помощью `Dockerfile` образа:

```
docker run --rm -it -p 3000:80 hh-gowork/front
```

Флаг `--rm` — автоматическое удаление остановленного контейнера.

Флаг `-i` — это сокращение для `--interactive`. Благодаря этому флагу поток `STDIN` поддерживается в открытом состоянии даже если контейнер к `STDIN` не подключен.
Флаг `-t` — это сокращение для `--tty`. Благодаря этому флагу выделяется псевдотерминал, который соединяет используемый терминал с потоками `STDIN` и `STDOUT` контейнера.
Для получения возможности взаимодействия с контейнером через терминал нужно совместно использовать флаги -i и -t.

Флаг `-p` представляет собой сокращение для `--port`. Конструкция `3000:80` перенаправляет порт Docker `80` на порт `3000` компьютера, на котором выполняется контейнер. Если в контейнере работает некое приложение, способное выводить что-то в браузер, то, для того, чтобы к нему обратиться, в нашем случае можно перейти в браузере по адресу `localhost:3000`, аналогично команде `yarn start` или `react-scripts start` без оболочки `Docker`.

Официальная документация [docker run](https://docs.docker.com/engine/reference/commandline/run/).

Запустите командой созданный образ и через несколько секунд откройте в браузере страницу [localhost:3000](http://localhost:3000/).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
