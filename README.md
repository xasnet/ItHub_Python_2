# React Django Notes

## Стэк:

### Backend:
- [Python 3](https://www.python.org/downloads/);
- [Django Framework](https://www.djangoproject.com/);
- [Django Rest](https://www.django-rest-framework.org/);
- [PyJWT](https://pyjwt.readthedocs.io/en/stable/);

### Frontend:
- [Vite](https://vitejs.dev/);
- [React](https://react.dev/);
- [Typescript](https://www.typescriptlang.org/);
- [ESLint](https://eslint.org/);
- [Prettier](https://prettier.io/);
- [Redux Toolkit](https://redux-toolkit.js.org/);
- [Mantine UI](https://mantine.dev/);

## Запуск на локальной машине

### Backend:
- В терминале запустить виртуальное окружение `python3 -m venv env`;
- Активировать виртуальный конфиг `source env/bin/activate`;
- Установить зависимости `pip install -r requirements.txt`;
- Запустить Backend командой `python manage.py runserver`;
- Сервер по адресу `http://127.0.0.1:8000`;

### Frontend:
- Провериь версию NodeJS (нужна выше 19) командой `node -v`;
- Установить зависимости `npm i` или `yarn` или `pnpm i`;
- Запустить проект `npm run dev` или `yarn dev` или `pnpm dev`;
- Открыть браузер по адресу `http://localhost:5173/login`;