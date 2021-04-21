import * as React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import styled from 'styled-components'
import { Content, Page, Sidebar, SidebarItem } from './components';
import { chartSimple } from './exampleChart';
import { FlowChartWithState, INodeInnerDefaultProps } from '@mrblenny/react-flow-chart';

const Outer = styled.div`
  padding: 30px;
  width: 250px;
`

const Message = styled.div`
margin: 10px;
padding: 10px;
background: rgba(0,0,0,0.05);
`

const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {

  return (
      <Outer>
          <p>{node.properties.title}</p>
          <br />
      </Outer>
  )
}

const Composer = () => (
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
        Local Catalogue
      </Message>
      <SidebarItem
        type="Load Point Cloud"
        ports={ {
          port1: {
            id: 'port1',
            type: 'bottom',
          },
        } }
        properties={ {
          title: 'Load Point Cloud',
        }}
      />
      <SidebarItem
        type="Normalize Point Cloud"
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
          title: 'Normalize Point Cloud',
        }}
      />
      <SidebarItem
        type="Polygon"
        ports={ {
          port1: {
            id: 'port1',
            type: 'bottom',
          },
        } }
        properties={ {
          title: 'Polygon',
        }}
      />
      <SidebarItem
        type="Attribute"
        ports={ {
          port1: {
            id: 'port1',
            type: 'bottom',
          },
        } }
        properties={ {
          title: 'Attribute',
        }}
      />
      <SidebarItem
        type="Volume"
        ports={ {
          port1: {
            id: 'port1',
            type: 'bottom',
          },
        } }
        properties={ {
          title: 'Volume',
        }}
      />
      <SidebarItem
        type="Export"
        ports={ {
          port1: {
            id: 'port1',
            type: 'top',
          },
        } }
        properties={ {
          title: 'Export',
        }}
      />
      <SidebarItem
        type="Filter Points by Polygon"
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
          title: 'Filter Points by Polygon',
        }}
      />
      <SidebarItem
        type="Filter Points by Attribute"
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
          title: 'Filter Points by Attribute',
        }}
      />
      <SidebarItem
        type="Compute Neighboors"
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
            type: 'top',
          },
          port4: {
            id: 'port4',
            type: 'bottom',
          },
          port5: {
            id: 'port5',
            type: 'bottom',
          }
        } }
        properties={ {
          title: 'Compute Neighboors',
        }}
      />
      <SidebarItem
        type="Compute Features"
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
            type: 'top',
          },
          port4: {
            id: 'port4',
            type: 'top',
          },
          port5: {
            id: 'port5',
            type: 'bottom',
          }
        } }
        properties={ {
          title: 'Compute Features',
        }}
      />
    </Sidebar>
  </Page>
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