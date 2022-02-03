# ToDo-List App

# Installation
```bash
# clone repo
git clone git@github.com:shaggy-axel/todo-list.git && cd todo-list/
cat env_sample >> .env # change values for superuser in .env

# create virtualenv and activate
python3 -m venv .venv
. .venv/bin/activate

# install requirements
pip install -U pip
pip install -r requirements.txt

# migrate, create superuser and some test users, runserver
python3 src/manage.py migrate
python3 src/manage.py create_superuser_and_test_users
python3 src/manage.py runserver
```