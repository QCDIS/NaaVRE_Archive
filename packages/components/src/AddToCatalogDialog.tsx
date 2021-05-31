import * as React from 'react';
import { ReactWidget, Dialog } from '@jupyterlab/apputils';

class AddToCatalogDialogBody extends ReactWidget implements Dialog.IBodyWidget {

    constructor() {
        super();
    }

    handleEvent(event: Event): void {
        console.log(event);
    }

    render() {
        return (
            <h4>Cell Added to the local catalog</h4>
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