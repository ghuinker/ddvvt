setup-project:
	cp .env.example .env
	python3 -m venv venv
	python3 -m pip install --upgrade pip
	. venv/bin/activate; pip install -r requirements.txt
	./scripts/update_secret_key.sh
	. venv/bin/activate; python3 manage.py migrate
	yarn install --check-files
	yarn build

update-requirements:
	pip freeze > requirements.txt
	echo "-e ." >> requirements.txt
