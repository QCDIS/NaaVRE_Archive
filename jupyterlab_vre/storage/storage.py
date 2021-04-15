from hashlib import md5

class Cell:

    title       : str
    source      : str
    ins         : set
    outs        : set
    dependencies : set
    chart_obj   : dict

    def __init__(
        self,
        title,
        source,
        ins,
        outs,
        dependencies,
        chart_obj
    ) -> None:
        
        self.title = title
        self.source = source
        self.ins = ins
        self.outs = outs
        self.depedencies = dependencies
        self.chart_obj = chart_obj

    def compile_dependencies(self):
        resolves = []
        for d in self.depedencies:
            resolve_to = "import %s" % d['name']
            if d['module']:
                resolve_to = "from %s %s" % (d['module'], resolve_to)
            if d['asname']:
                resolve_to += " as %s" % d['asname']
            resolves.append(resolve_to)
        return resolves

    def __hash__(self):
        return md5(self.title.encode('utf-8') + self.source.encode('utf-8')).hexdigest()[:16]


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
