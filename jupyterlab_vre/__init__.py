from ._version import __version__ 
from notebook.utils import url_path_join
from .handlers import ExtractorHandler, CatalogAddHandler, CatalogGetAllHandler

def _jupyter_server_extension_paths():
    return [{
        "module": "jupyterlab_vre"
    }]


def load_jupyter_server_extension(lab_app):

    host_pattern = '.*$'

    lab_app.web_app.add_handlers(host_pattern, [
        (url_path_join(lab_app.web_app.settings['base_url'], r'/vre/extractor'), ExtractorHandler),
        (url_path_join(lab_app.web_app.settings['base_url'], r'/vre/catalog/add'), CatalogAddHandler)
    ])
    
    lab_app.log.info("Registered FAIR-Cells extension at URL path /vre")
