import * as React from 'react';
import styled from 'styled-components';
import { INodeInnerDefaultProps } from "@mrblenny/react-flow-chart";


const Outer = styled.div`
  padding: 10px;
  width: 150px;
`

export const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {

    return (
        <Outer>
            <p className={'node-title'}>{node.properties.title}</p>
            <br />
        </Outer>
    )
}