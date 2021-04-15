import json
import uuid
import nbformat as nb
import autopep8
from notebook.base.handlers import APIHandler
from tornado import web
from jupyterlab_vre.extractor.extractor import Extractor
from jupyterlab_vre.converter.converter import ConverterReactFlowChart
from jupyterlab_vre.storage.storage import Cell, TempStorage
from jinja2 import Environment, PackageLoader, FileSystemLoader


################################################################################

                            # Extractor

################################################################################

class ExtractorHandler(APIHandler):

    @web.authenticated
    async def get(self):
        msg_json = dict(title="Operation not supported.")
        self.write(msg_json)
        self.flush()


    @web.authenticated
    async def post(self, *args, **kwargs):
        payload = self.get_json_body()
        cell_index = payload['cell_index']
        notebook = nb.reads(json.dumps(payload['notebook']), nb.NO_CONVERT)
        sources = [ cell.source for cell in notebook.cells if cell.cell_type == 'code' and len(cell.source) > 0]

        imports = Extractor.extract_imports(sources)
        source = notebook.cells[cell_index].source

        undefined = [ und for und in Extractor.extract_undefined(source) if und not in imports ]
        names = Extractor.extract_names(source)
        clean_names = [ name for name in names if name not in undefined and name not in imports ]
		
        title = source.partition('\n')[0]
        title = title if title[0] == "#" else "Untitled"
        
        ins = set(undefined)
        outs = set(clean_names)

        dependencies = []
        for n in names:
            if n in imports:
                dependencies.append(imports.get(n))

        node_id = str(uuid.uuid4())[:7]
        node = ConverterReactFlowChart.get_node(node_id, title, ins, outs)
        chart = {
            'offset': {
                'x': 0,
                'y': 0,
            },
            'scale': 1,
            'nodes': { node_id: node },
            'links': {},
            'selected': {},
            'hovered': {},
        }

        cell = Cell(
            title           = title,
            source          = source,
            ins             = ins,
            outs            = outs,
            dependencies    = dependencies,
            chart_obj       = chart
        )

        TempStorage.set_cell(cell)
        TempStorage.set_global_imports(imports)

        self.write(json.dumps({
            'node_id'   : node_id,
            'chart'     : chart
        }))
        
        self.flush()


################################################################################

                            # Catalog

################################################################################

class CatalogAddHandler(APIHandler):

    @web.authenticated
    async def get(self):
        msg_json = dict(title="Operation not supported.")
        self.write(msg_json)
        self.flush()


    @web.authenticated
    async def post(self, *args, **kwargs):
        current_cell = TempStorage.get_cell()
        deps = current_cell.compile_dependencies()
        loader = PackageLoader('FAIRCells_VRE', 'templates')
        template_env = Environment(loader=loader)
        template = template_env.get_template('cell_template.jinja2')
        compiled_code = template.render(cell=current_cell, deps=deps)
        compiled_code = autopep8.fix_code(compiled_code)
        


class CatalogGetAllHandler(APIHandler):

    @web.authenticated
    async def get(self):
        self.flush()


    @web.authenticated
    async def post(self, *args, **kwargs):
        msg_json = dict(title="Operation not supported.")
        self.write(msg_json)
        self.flush()
