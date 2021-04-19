import * as React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import { chartSimple } from './exampleChart';
import { FlowChartWithState } from '@mrblenny/react-flow-chart';

const Composer = () => (
    <FlowChartWithState initialValue={chartSimple} />
);

export class ComposerWidget extends ReactWidget {

    constructor() {
        super();
        this.addClass('vre-composer');
    }

    render(): JSX.Element {
        return <Composer />;
    }
}