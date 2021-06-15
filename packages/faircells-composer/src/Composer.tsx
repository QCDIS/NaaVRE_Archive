import * as React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import styled from 'styled-components'
import { theme } from './Theme';
import { Content, Page, Sidebar, SidebarItem } from './components';
import { chartSimple } from './exampleChart';
import { FlowChartWithState } from '@mrblenny/react-flow-chart';
import { Button, ThemeProvider } from '@material-ui/core';
import { NodeInnerCustom, PortCustom } from '@jupyter_vre/chart-customs';
import { requestAPI } from '@jupyter_vre/core';


const Message = styled.div`
padding: 20px;
color: white;
font-weight: bold;
padding: 20px;
font-size: larger;
background: #4e79ba;
`

interface IProps {  }

interface IState {
	catalog_elements: []
}

export const DefaultState: IState = {
	catalog_elements: []
}

class Composer extends React.Component<IProps, IState> {

	state = DefaultState

	constructor(props: IProps) {
		super(props);
		this.getCatalog();
	}

	getCatalog = async () => {

		const resp = await requestAPI<any>('catalog/all', {
		  method: 'GET'
		});
		
		this.setState({ catalog_elements: resp });
	}

	render() {
		return (
			<ThemeProvider theme={theme} >
				<Page>
					<Content>
						<FlowChartWithState 
						initialValue={chartSimple}
						Components={{
							NodeInner	: NodeInnerCustom,
							Port		: PortCustom
						}}
						/>
					</Content>
				</Page>
			<Sidebar>
				<Message>
					Local Catalog
				</Message>
				<div className={'sidebar-items-container'}>
					{this.state.catalog_elements.map((value, index) => {
						let nodes = value['chart_obj']['nodes']
						let element = nodes[Object.keys(nodes)[0]]
						console.log(element)
						return (
							<SidebarItem
								type={element['type']}
								ports={element['ports']}
								properties={element['properties']}
							/>
						)
					})}
				</div>
			</Sidebar>
			<Button className={'export-btn'} 
				variant="contained"
				onClick={this.getCatalog}
				color="secondary">
				Export Workflow
			</Button>
			</ThemeProvider>
			)
	}
}

export class ComposerWidget extends ReactWidget {

  constructor() {
      super();
      this.addClass('vre-composer');
  }

  render(): JSX.Element {
      return (
        <Composer />
      );
  }
}