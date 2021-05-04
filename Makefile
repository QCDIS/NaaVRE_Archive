SHELL:=/bin/bash

purge:
	rm -rf build *.egg-info yarn-error.log
	rm -rf node_modules lib dist
	rm -rf $$(find packages -name node_modules -type d -maxdepth 2)
	rm -rf $$(find packages -name dist -type d)
	rm -rf $$(find packages -name lib -type d)
	rm -rf $$(find . -name __pycache__ -type d)
	rm -rf $$(find . -name *.tgz)
	rm -rf $$(find . -name tsconfig.tsbuildinfo)
	rm -rf $$(find . -name *.lock)
	rm -rf $$(find . -name package-lock.json)
	rm -rf $$(find . -name .pytest_cache)
	jlpm cache clean

build-backend: 
	python setup.py bdist_wheel sdist

install-backend: build-backend
	pip install --upgrade --upgrade-strategy only-if-needed  --use-deprecated=legacy-resolver dist/jupyterlab_vre-1.0.0-py3-none-any.whl
	jupyter serverextension enable --py jupyterlab_vre --user

build-frontend: jlpm-install
	npx lerna run build

jlpm-install: 
	jlpm