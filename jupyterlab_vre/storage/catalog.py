import json
from tinydb import TinyDB, Query, where
from jupyterlab_vre.faircell import Cell


TinyDB.DEFAULT_TABLE = 'cells'

class Catalog:

    db = TinyDB('catalog.json')
    cells = db.table('cells')
    editor_buffer: Cell

    @classmethod
    def add_cell(cls, cell: Cell):
        cls.cells.insert(cell.__dict__)

    @classmethod
    def get_all(cls):
        return cls.cells.all()