# ToDo-List App

![Tests](https://github.com/shaggy-axel/todo-list/actions/workflows/linter.yml/badge.svg)

# Installation
```bash
# clone repo
git clone git@github.com:shaggy-axel/todo-list.git && cd todo-list/

# BACKEND

# create virtualenv and activate
cd backend
cat env_sample >> .env # change values for superuser in .env
python3 -m venv .venv
. .venv/bin/activate

# install requirements
pip install -U pip
pip install -r requirements.txt

# migrate, create superuser and some test users, runserver
python src/manage.py migrate
python src/manage.py create_superuser_and_test_users
python src/manage.py runserver

# FRONTEND
cd ../frontend/
# install dependencies
npm install
# run client
npm start
```