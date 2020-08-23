import React from 'react'
import RangeSelector from '../selectors/RangeSelector'
import { Label, Form } from 'semantic-ui-react'
import PlacementTypeSelector from '../selectors/PlacementTypeSelector'
import PositionSelector from '../selectors/PositionSelector'
import { PlacementType } from '../../common/enums'

type propsType = {

}

type stateType = {
    range: { start: number, end: number },
    placementType: PlacementType,
    position: number
}

export class OperationMove extends React.Component<propsType, stateType> {

    state = {
        range: {start: 0, end: 0},
        placementType: PlacementType.Place,
        position: 0
    }

    handleRangeChange = (range: { start: number, end: number }) => {
        this.setState({ range: range })
    }

    handlePlacementTypeChange = (placementType: PlacementType) => {
        this.setState({ placementType: placementType })
    }

    handlePositionChange = (position: number) => {
        this.setState({ position: position })
    }

    render() {
        return (
            <Form.Input>
                <RangeSelector onRangeChange={this.handleRangeChange} />
                <Label style={{ fontSize: '16px' }} basic>and</Label>
                <PlacementTypeSelector />
                <Label style={{ fontSize: '16px' }} basic>at</Label>
                <PositionSelector onPositionChange={this.handlePositionChange} rangeStart={this.state.range.start} />
            </Form.Input>
        )
    }
}