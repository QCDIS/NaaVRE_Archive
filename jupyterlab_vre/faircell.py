from typing import Set, Any
import FAIRCells_VRE.sourceutils as su
import uuid


class CellManager:

	def __init__(self, sources):
		super().__init__()

		self.imports = su.extract_imports(sources)
		self.cells = [ self.__build_cell(src) for src in sources ]


	def __build_cell(self, source):

		cell = FAIRCell(
			label = source.partition('\n')[0],
			source = source
		)

		undefined = [ und for und in su.extract_undefined(source) if und not in self.imports ]
		names = [ name for name in su.extract_names(source) if name not in undefined and name not in self.imports ]
		
		cell.inputs = set(undefined)
		cell.outputs = set(names)

		return cell


class FAIRCell:

	def __init__(self,
				label: str,
				source: str,
				description: str = None, 
				inputs: Set[Any] = None,
				outputs: Set[Any] = None
				):

		super().__init__()

		self.uuid = uuid.uuid4()
		self.id = id
		self.label = label
		self.description = description
		self.source = source
		self.inputs = inputs or set()
		self.outputs = outputs or set()
