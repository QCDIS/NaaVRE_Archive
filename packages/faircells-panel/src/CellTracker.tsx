import { FlowChart, IChart } from "@mrblenny/react-flow-chart";
import { cloneDeep, mapValues } from 'lodash'
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";
import * as React from 'react';
import { requestAPI } from './FAIRCells-VRE';
import { INotebookModel, Notebook, NotebookPanel } from '@jupyterlab/notebook';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { Cell } from '@jupyterlab/cells';
import Table from '@material-ui/core/Table';
import { theme } from './Theme';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TableBody, ThemeProvider } from "@material-ui/core";
import { NodeInnerCustom } from '@jupyter_vre/chart-customs';

const defaultChart: IChart = { 
    offset: {
        x: 0,
        y: 0,
    },
    scale: 1,
    nodes: {},
    links: {},
    selected: {},
    hovered: {}
}

interface IProps {
    notebook: NotebookPanel;
}

interface IState {
    activeCellIndex : number,
    chart           : IChart,
    loading         : boolean,
    success         : boolean    
}


type SaveState = 'started' | 'completed' | 'failed';

export class CellTracker extends React.Component<IProps, IState> {

    state = cloneDeep(defaultChart)
    currCellIndex = 0
    currNodeId: string = null;

    stateActions = mapValues(actions, (func: any) =>
        (...args: any) => this.setState(func(...args))) as typeof actions

    apiCall = async (notebookModel: INotebookModel, save = false) => {
            
        const resp = await requestAPI<any>('extractor', {
            body: JSON.stringify({
                save: save,
                cell_index: this.currCellIndex, //this.state.activeCellIndex,
                notebook: notebookModel.toJSON()
            }),
            method: 'POST'
        });

        this.currNodeId = resp['node_id'];
        this.setState(resp['chart']);
        
        console.log(resp);
    }

    addToCatalog = async () => {

        if (!this.state.loading) {

            console.log('Adding ..')

            await requestAPI<any>('catalog/add', {
                body: JSON.stringify({
                    cell_index: this.state.activeCellIndex
                }),
                method: 'POST'
            });
        }
    }

    onActiveCellChanged = (notebook: Notebook, activeCell: Cell) => {
        this.currCellIndex = notebook.activeCellIndex;
        this.apiCall(this.props.notebook.model);
    };

    handleSaveState = (context: DocumentRegistry.Context, state: SaveState) => {
        if (state === 'completed') {
            this.apiCall(this.props.notebook.model);
        }
    };

    connectAndInitWhenReady = (notebook: NotebookPanel) => {
        notebook.context.ready.then(() => {
            this.props.notebook.content.activeCellChanged.connect(this.onActiveCellChanged);
            this.props.notebook.context.saveState.connect(this.handleSaveState);
            this.currCellIndex = notebook.content.activeCellIndex
        });
    };

    componentDidMount = () => {
        if (this.props.notebook) {
            this.connectAndInitWhenReady(this.props.notebook);
        }
    }

    componentDidUpdate = async (
        prevProps: Readonly<IProps>,
        prevState: Readonly<IState>,
    ) => {
        
        const preNotebookId = prevProps.notebook ? prevProps.notebook.id : '';
        const notebookId = this.props.notebook ? this.props.notebook.id : '';

        if (preNotebookId !== notebookId) {

            if (prevProps.notebook) {
                prevProps.notebook.content.activeCellChanged.disconnect(this.onActiveCellChanged);
            }
            if (this.props.notebook) {
                this.connectAndInitWhenReady(this.props.notebook);
            }
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <p className={'lw-panel-preview'}>Node Preview: </p>
                        <div className={'lw-panel-editor'}>
                            <FlowChart
                                chart={this.state}
                                callbacks={this.stateActions}
                                Components={{
                                    NodeInner   : NodeInnerCustom
                                }}
                            />
                        </div>
                        {this.currNodeId ? (
                            <div>
                            <p className={'lw-panel-preview'}>Inputs and Outputs</p>
                            <TableContainer component={Paper} className={'lw-panel-table'}>
                                <Table aria-label="simple table">
                                    <TableBody>
                                    {this.state.nodes[this.currNodeId].properties['vars'].map((variable: any) => (
                                        <TableRow key={variable.name}>
                                            <TableCell component="th" scope="row">
                                                {variable.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {variable.direction}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>
                            <p className={'lw-panel-preview'}>Parameters</p>
                            <TableContainer component={Paper} className={'lw-panel-table'}>
                                <Table aria-label="simple table">
                                    <TableBody>
                                    {this.state.nodes[this.currNodeId].properties['params'].map((param: any) => (
                                        <TableRow key={param}>
                                            <TableCell component="th" scope="row">
                                                {param}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>
                            <p className={'lw-panel-preview'}>Dependencies</p>
                            <TableContainer component={Paper} className={'lw-panel-table'}>
                                <Table aria-label="simple table">
                                    <TableBody>
                                    {this.state.nodes[this.currNodeId].properties['deps'].map((dep: any) => (
                                        <TableRow key={dep}>
                                            <TableCell component="th" scope="row">
                                                {dep}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>
                            </div>
                        ) :(
                            <TableContainer></TableContainer>
                        )}
                        <Button variant="contained" 
                                className={'lw-panel-button'}
                                onClick={this.addToCatalog}
                                color="primary">
                            Add to catalog
                        </Button>
                </div>
            </ThemeProvider>
        );
    }
}