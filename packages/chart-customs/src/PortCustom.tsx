import styled from 'styled-components';
import { IPortDefaultProps } from '@mrblenny/react-flow-chart';
import * as React from 'react';


const PortDefaultOuter = styled.div`
  width: 18px;
  height: 18px;
  background: ${(props: { color: any; }) => props.color};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PortCustom = (props: IPortDefaultProps) => (
    <PortDefaultOuter color={props.port.properties.color}/>
)