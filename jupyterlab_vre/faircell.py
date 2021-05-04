from hashlib import md5

class Cell:

    title               : str
    original_source     : str
    inputs              : set
    outputs             : set
    dependencies        : set
    chart_obj           : dict
    container_source    : str

    def __init__(
        self,
        title,
        original_source,
        inputs,
        outputs,
        dependencies,
        chart_obj,
        container_source
    ) -> None:
        
        self.title              = title
        self.original_source    = original_source
        self.inputs             = inputs
        self.outputs            = outputs
        self.depedencies        = dependencies
        self.chart_obj          = chart_obj
        self.container_source   = container_source

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
