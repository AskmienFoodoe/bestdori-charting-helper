import React from 'react'
import RangeSelector from '../selectors/RangeSelector'
import { Label, Form } from 'semantic-ui-react'
import PlacementTypeSelector from '../selectors/PlacementTypeSelector'
import PositionSelector from '../selectors/PositionSelector'

type propsType = {

}

type stateType = {

}

export class OperationMove extends React.Component<propsType, stateType> {

    render() {
        return (
            <Form.Input>
                <RangeSelector />
                <Label style={{ fontSize: '16px' }} basic>and</Label>
                <PlacementTypeSelector />
                <Label style={{ fontSize: '16px' }} basic>at</Label>
                <PositionSelector />
            </Form.Input>
        )
    }
}