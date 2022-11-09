DOCKERCOMPOSETEST=docker-compose -f docker/docker-compose.test.yml
PROJECT_NAME={{project_name}}

devup:
	docker-compose up -d

devupb:
	docker-compose up --build -d

devdown:
	docker-compose down --remove-orphans

testup:
	${DOCKERCOMPOSETEST} up -d

testupb:
	${DOCKERCOMPOSETEST} up --build -d

testdown:
	${DOCKERCOMPOSETEST} down --remove-orphans

build:
	docker build -t ${PROJECT_NAME}_web:latest .

setup-project:
	test $(PROJECT_NAME)
	./scripts/update_projectname.sh ${PROJECT_NAME}
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
