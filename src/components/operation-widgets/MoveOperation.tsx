import React from 'react'
import RangeSelector from '../selectors/RangeSelector'
import { Label, Form } from 'semantic-ui-react'
import PlacementTypeSelector from '../selectors/PlacementTypeSelector'
import PositionSelector from '../selectors/PositionSelector'
import { PlacementType } from '../../common/enums'
import { BoundChartOperation } from '../../common/operations'
import { OperationWidget } from '../../common/OperationWidget'
import { Chart } from '../../common/Chart'
import deepEqual from 'deep-equal'

type propsType = {
    updateBoundOperation: (boundOperation: BoundChartOperation) => void
}

type stateType = {
    range: { start: number, end: number },
    placementType: PlacementType,
    position: number
}

export class MoveOperation extends React.Component<propsType, stateType> implements OperationWidget {

    state = {
        range: { start: 0, end: 0 },
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

    bindOperation = (start: number, end: number, position: number, placementType: PlacementType) => {
        return (chart: Chart) => {
            const notesExcerpt = chart.cutNotesExcerpt(start, end)
            chart.addNotes(notesExcerpt, position, placementType)
            return chart
        }
    }

    componentDidUpdate(prevProps: propsType, prevState: stateType) {
        if (!deepEqual(prevState, this.state, { strict: true })) {
            const { start, end } = this.state.range
            this.props.updateBoundOperation(this.bindOperation(start, end, this.state.position, this.state.placementType))
        }
    }

    render() {
        return (
            <Form.Input>
                <RangeSelector onRangeChange={this.handleRangeChange} />
                <Label style={{ fontSize: '16px' }} basic>and</Label>
                <PlacementTypeSelector onPlacementTypeChange={this.handlePlacementTypeChange} />
                <Label style={{ fontSize: '16px' }} basic>at</Label>
                <PositionSelector onPositionChange={this.handlePositionChange} rangeStart={this.state.range.start} />
            </Form.Input>
        )
    }
}