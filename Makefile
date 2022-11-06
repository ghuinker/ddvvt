setup-project:
	cp .env.example .env
	python3 -m venv venv
	. venv/bin/activate; pip install -r requirements.txt
	ptyon3 -m pip install --upgrade pip
	# TODO: vite

update-requirements:
	pip freeze > requirements.txt
	echo "-e ." >> requirements.txt
