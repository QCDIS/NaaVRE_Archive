import hashlib

class Cell:

    title               : str
    original_source     : str
    inputs              : list
    outputs             : list
    params              : list
    dependencies        : list
    chart_obj           : dict
    container_source    : str
    cell_hash           : int

    def __init__(
        self,
        title,
        original_source,
        inputs,
        outputs,
        params,
        dependencies,
        chart_obj,
        container_source
    ) -> None:
        
        self.title              = title
        self.original_source    = original_source
        self.inputs             = list(inputs)
        self.outputs            = list(outputs)
        self.params             = list(params)
        self.depedencies        = dependencies
        self.chart_obj          = chart_obj
        self.container_source   = container_source
        self.cell_hash          = int(hashlib.sha1(original_source.encode('utf-8')).hexdigest(), 16)

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
