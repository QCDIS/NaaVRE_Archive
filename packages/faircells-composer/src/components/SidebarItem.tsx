import { INode, REACT_FLOW_CHART } from '@mrblenny/react-flow-chart'
import * as React from 'react'
import styled from 'styled-components'

const Outer = styled.div`
  padding: 16px 20px;
  font-size: 14px;
  background: white;
  border-bottom: 1px solid #eeeeee;
  cursor: move;
`

export interface ISidebarItemProps {
  type: string,
  ports: INode['ports'],
  properties?: any,
}

export const SidebarItem = ({ type, ports, properties }: ISidebarItemProps) => {
  return (
    <Outer
      draggable={true}
      onDragStart={ (event: any) => {
        event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({ type, ports, properties }))
      } }
    >
      {properties['title']}
    </Outer>
  )
}
