FROM jupyterhub/k8s-singleuser-sample:0.11.1

USER root

ADD start-jupyter.sh /usr/local/bin/start-jupyter.sh
ADD jupyterlab_vre-1.0.0-py3-none-any.whl /home/jovyan/jupyterlab_vre-1.0.0-py3-none-any.whl
ADD demo_notebook.ipynb /home/jovyan/demo_notebook.ipynb
ADD side_icon.png /home/jovyan/side_icon.png

RUN chmod ugo+x /usr/local/bin/start-jupyter.sh

USER $NB_USER

RUN conda remove --force -y terminado && \
    python -m pip install --upgrade pip

RUN python3 -m pip install --quiet --no-cache-dir /home/jovyan/jupyterlab_vre-1.0.0-py3-none-any.whl && \
    jupyter serverextension enable --py jupyterlab_vre --user && \
    jupyter lab build;

CMD ["/usr/local/bin/start-jupyter.sh"]