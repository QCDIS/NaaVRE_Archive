import json
from tinydb import TinyDB, Query
from jupyterlab_vre.faircell import Cell


class Catalog:

    db = TinyDB('catalog.json')
    editor_buffer: Cell

    @classmethod
    def add_cell(cls, cell: Cell):
        cls.db.insert(cell.__dict__)