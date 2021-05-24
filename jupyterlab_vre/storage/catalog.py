import json
from tinydb import TinyDB, Query
from jupyterlab_vre.faircell import Cell


class Catalog:

    db = TinyDB('catalog.json')
    editor_buffer: Cell

    @classmethod
    def add_cell(cls, cell: Cell):
        print(json.dumps(cell.__dict__))
        cls.db.insert(cell.__dict__)