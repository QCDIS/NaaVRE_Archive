import json
from pathlib import Path
import setuptools

HERE = Path(__file__).parent.resolve()


name = "jupyterlab_vre"
labext_name = "jupyterlab_vre"
long_description = (HERE / "README.md").read_text()
pkg_json = json.loads((HERE / "package.json").read_bytes())
frontend_packages_path = "./dist/*.tgz"

setup_args = dict(
    name=name,
    version="1.0.0",
    url="https://github.com/github_username/jupyterlab_vre",
    author="Riccardo Bianchi",
    author_email="riccardo.bianchi@lifewatch.eu",
    description="Jupyter Lab extension for virtual research environments",
    license="BSD-3-Clause",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(),
    install_requires=[
        "jupyterlab~=3.0",
    ],
    zip_safe=False,
    include_package_data=True,
    python_requires=">=3.6",
    platforms="Linux, Mac OS X, Windows",
    keywords=["Jupyter", "JupyterLab", "JupyterLab3"],
    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Framework :: Jupyter",
    ],
)

if __name__ == "__main__":
    setuptools.setup(**setup_args)
