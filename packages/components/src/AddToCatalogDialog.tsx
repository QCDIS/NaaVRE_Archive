import * as React from 'react';
import { ReactWidget, Dialog } from '@jupyterlab/apputils';
import { LinearProgress } from '@material-ui/core';

class AddToCatalogDialogBody extends ReactWidget implements Dialog.IBodyWidget {

    constructor() {
        super();
    }

    handleEvent(event: Event): void {
        console.log(event);
    }

    render() {
        return (
            <div>
                <p className={'add-catalog-label'}>Adding cell to the catalog ..</p>
                <LinearProgress className={'add-catalog-progress'}/>
            </div>
        );
    }

    static async init(): Promise<AddToCatalogDialogBody> {
        const dialogBody = new AddToCatalogDialogBody();
        return dialogBody;
    }
}

export const showAddToCatalogDialog = async (): Promise<Dialog.IResult<any>> => {
    const dialogBody = await AddToCatalogDialogBody.init()
    const dialog = new Dialog({
        title: '',
        body: dialogBody,
        buttons: []
    })

    return dialog.launch().then((result: any) => {
        return result;
    });
}