import os

from OCC.STEPControl import STEPControl_Reader

def step2json(inputFile, outputFile):  # STEP Files
    step_reader = STEPControl_Reader()
    status = step_reader.ReadFile(inputFile)
 
    if status == IFSelect_RetDone:  # check status
        failsonly = False
        step_reader.PrintCheckLoad(failsonly, IFSelect_ItemsByEntity)
        step_reader.PrintCheckTransfer(failsonly, IFSelect_ItemsByEntity)
 
        step_reader.TransferRoot(1)
        _nbs = step_reader.NbShapes()
        _shape = step_reader.Shape(1)
        _tess = ShapeTesselator(_shape)
        _tess.Compute(compute_edges=False, mesh_quality=50)
 
        with open(outputFile, "w") as text_file:
            json = _tess.ExportShapeToThreejsJSONString(inputFile)
            json = json.replace("\\", "/")
            text_file.write(json)
    else:
        raise Exception("Error: can't read file - Method: _load_STEP_file")


for file_name in os.listdir('.'):
    if file_name.endswith('.STEP'):
        print(file_name)
        step2json(file_name, f'{file_name[:-4]}.json')
