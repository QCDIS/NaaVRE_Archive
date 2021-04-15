import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { ToolbarButton } from '@jupyterlab/apputils';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { LabIcon } from '@jupyterlab/ui-components';
import fairifySVG from '../style/icons/icon_fairify.svg';
import { requestAPI } from './FAIRCells-VRE';

export class FAIRButton implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {

    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {

        async function callback(notebookModel: INotebookModel) {
            
            const resp = await requestAPI<any>('extractor', {
                body: JSON.stringify(notebookModel.toJSON()),
                method: 'POST'
            });

            console.log(resp)
        }

        const fairifyIcon = new LabIcon({
            name: 'fairify:icon',
            svgstr: fairifySVG
        });

        let button = new ToolbarButton({
            className: 'fairButton',
            onClick: () => callback(panel.model),
            icon: fairifyIcon,
            tooltip: 'Create catalog'
        });

        panel.toolbar.insertItem(0, 'FAIRify', button);
        return new DisposableDelegate(() => {
            button.dispose();
        });
    }
}