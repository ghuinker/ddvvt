DOCKERCOMPOSETEST=docker-compose -f docker/docker-compose.test.yml
PROJECT_NAME=

devup:
	docker-compose up

devupb:
	docker-compose up --build

devdown:
	docker-compose down --remove-orphans

testup:
	${DOCKERCOMPOSETEST} up

testupb:
	${DOCKERCOMPOSETEST} down --remove-orphans -v
	${DOCKERCOMPOSETEST} up --build

testdown:
	${DOCKERCOMPOSETEST} down --remove-orphans

build:
	docker build -t ${PROJECT_NAME}_web:latest .

setup-project:
	test $(PROJECT_NAME)
	sed -i '' "s/{{project_name}}/${PROJECT_NAME}/g" ./DockerFile
	sed -i '' "s/{{project_name}}/${PROJECT_NAME}/g" ./docker-compose.yml
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
