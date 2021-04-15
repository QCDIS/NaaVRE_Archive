import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

/**
 * Initialization data for the jupyterlab_vre extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_vre:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_vre is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupyterlab_vre server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default extension;
