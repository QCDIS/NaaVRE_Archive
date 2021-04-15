import re
from pyflakes import reporter as pyflakes_reporter, api as pyflakes_api
import ast

class Extractor:

    @staticmethod
    def extract_imports(sources):

        imports = { }
        for s in sources:
            tree = ast.parse(s)
            for node in ast.walk(tree):
                if isinstance(node, (ast.Import, ast.ImportFrom,)):
                    for n in node.names:
                        key = n.asname if n.asname else n.name
                        if key not in imports:
                            imports[key] = {
                                'name'	: n.name,
                                'asname': n.asname or None,
                                'module': node.module if isinstance(node, ast.ImportFrom) else ""
                            }
        return imports


    @staticmethod
    def extract_names(source):

        names = set()
        tree = ast.parse(source)
        for module in ast.walk(tree):
            if isinstance(module, (ast.Name,)):
                names.add(module.id)
        return names


    @staticmethod
    def extract_all_undefined(sources):
        all_undefined = set()
        for source in sources:
            all_undefined.update(Extractor.extract_undefined(source))
        return all_undefined


    @staticmethod
    def extract_undefined(code):

        flakes_stdout = StreamList()
        flakes_stderr = StreamList()
        rep = pyflakes_reporter.Reporter(
            flakes_stdout.reset(),
            flakes_stderr.reset())
        pyflakes_api.check(code, filename="temp", reporter=rep)

        if rep._stderr():
            raise RuntimeError("Flakes reported the following error:"
                            "\n{}".format('\t' + '\t'.join(rep._stderr())))
        p = r"'(.+?)'"

        out = rep._stdout()
        undef_vars = set()

        for line in filter(lambda a: a != '\n' and 'undefined name' in a, out):
            var_search = re.search(p, line)
            undef_vars.add(var_search.group(1))
        return undef_vars


class StreamList:

    def __init__(self):
        self.out = list()

    def write(self, text):
        self.out.append(text)

    def reset(self):
        self.out = list()
        return self

    def __call__(self):
        return self.out