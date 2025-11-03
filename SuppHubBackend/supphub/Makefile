run:
	python3 manage.py runserver

install:
	pipenv lock && pipenv sync

installdev:
	pipenv lock && pipenv sync --dev


fix:
	python -m black .
	python -m isort .

check:
	python -m flake8 .
	python -m black --check .
	python -m isort --check .
	python -m mypy --check-untyped-defs --no-namespace-packages .
