from jupyterlab_vre.faircell import Cell

class TempStorage:

    current_cell:   Cell
    global_imports: {}

    @staticmethod
    def set_cell(cell: Cell):
        TempStorage.current_cell = cell

    @staticmethod
    def set_global_imports(imports):
        TempStorage.global_imports = imports

    @staticmethod
    def get_global_imports():
        return TempStorage.global_imports

    @staticmethod
    def get_cell() -> Cell:
        return TempStorage.current_cell
