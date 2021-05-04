import * as React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import styled from 'styled-components'
import { theme } from './Theme';
import { Content, Page, Sidebar, SidebarItem } from './components';
import { chartSimple } from './exampleChart';
import { FlowChartWithState } from '@mrblenny/react-flow-chart';
import { Button, ThemeProvider } from '@material-ui/core';
import { NodeInnerCustom } from '@jupyter_vre/chart-customs';


const Message = styled.div`
padding: 20px;
color: white;
font-weight: bold;
padding: 20px;
font-size: larger;
background: #4e79ba;
`

const Composer = () => (
  <ThemeProvider theme={theme}>
    <Page>
      <Content>
        <FlowChartWithState 
          initialValue={chartSimple}
          Components={{
            NodeInner: NodeInnerCustom
        }}
        />
      </Content>
      <Sidebar>
        <Message>
          VRE Knowledge Base
        </Message>
        <SidebarItem
          type="Load as a las file"
          ports={ {
            port1: {
              id: 'port1',
              type: 'bottom',
            },
          } }
          properties={ {
            title: 'Load as a las file',
          }}
        />
        <SidebarItem
          type="Normalize point cloud"
          ports={ {
            port1: {
              id: 'port1',
              type: 'top',
            },
            port2: {
              id: 'port2',
              type: 'bottom',
            }
          } }
          properties={ {
            title: 'Normalize point cloud',
          }}
        />
        <SidebarItem
          type="Write result to ply file"
          ports={ {
            port1: {
              id: 'port1',
              type: 'top',
            },
          } }
          properties={ {
            title: 'Write result to ply file',
          }}
        />
        <SidebarItem
          type="Filter points by attributed threshold"
          ports={ {
            port1: {
              id: 'port1',
              type: 'top',
            },
            port2: {
              id: 'port2',
              type: 'bottom',
            }
          } }
          properties={ {
            title: 'Filter points by attributed threshold',
          }}
        />
        <SidebarItem
          type="Compute neighbors"
          ports={ {
            port1: {
              id: 'port1',
              type: 'top',
            },
            port2: {
              id: 'port2',
              type: 'top',
            },
            port3: {
              id: 'port3',
              type: 'bottom',
            }
          } }
          properties={ {
            title: 'Compute neighbors',
          }}
        />
        <SidebarItem
          type="Calculate neighbors and selected features"
          ports={ {
            port1: {
              id: 'port1',
              type: 'top',
            },
            port2: {
              id: 'port2',
              type: 'top',
            },
            port3: {
              id: 'port3',
              type: 'bottom',
            },
            port4: {
              id: 'port4',
              type: 'bottom',
            }
          } }
          properties={ {
            title: 'Calculate neighbors and selected features',
          }}
        />
      </Sidebar>
      <Button className={'export-btn'} variant="contained" color="secondary">Export Workflow</Button>
    </Page>
  </ThemeProvider>
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