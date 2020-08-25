import React from 'react'
import { Dropdown, Label, DropdownProps, Form } from 'semantic-ui-react'
import { BoundChartOperation } from '../../common/operations'
import { Chart } from '../../common/Chart'
import { MoveOperation } from '../operation-widgets/MoveOperation'
import { Operation } from '../../common/enums'
import { CopyOperation } from '../operation-widgets/CopyOperation'
import { MirrorOperation } from '../operation-widgets/MirrorOperation'

const options = Object.keys(Operation).map(operation => {
    return {
        key: operation.toLowerCase(),
        text: operation,
        value: operation
    }
})

type propsType = {
    onOperationChange: (boundOperation: BoundChartOperation) => void
}

type stateType = {
    operationOption: Operation
    boundOperation: BoundChartOperation
}

export default class OperationSelector extends React.Component<propsType, stateType> {

    state = {
        operationOption: Operation.Move,
        boundOperation: (chart: Chart) => chart
    }

    handleOptionChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        let newOperationOption = data.value as Operation
        this.setState({ operationOption: newOperationOption })
    }

    updateBoundOperation = (boundOperation: BoundChartOperation) => {
        this.setState({ boundOperation: boundOperation })
    }

    componentDidUpdate(prevProps: propsType, prevState: stateType) {
        if(prevState.boundOperation !== this.state.boundOperation) {
            this.props.onOperationChange(this.state.boundOperation)
        }
    }

    renderOperationWidget() {
        switch (this.state.operationOption) {
            case Operation.Move:
                return <MoveOperation updateBoundOperation={this.updateBoundOperation} />
            case Operation.Copy:
                return <CopyOperation updateBoundOperation={this.updateBoundOperation} />
            case Operation.Mirror:
                return <MirrorOperation updateBoundOperation={this.updateBoundOperation} />
        }
    }

    render() {
        return (
            <Form.Input>
                <Label style={{ fontSize: '16px' }}>
                    <Dropdown
                        options={options}
                        value={this.state.operationOption}
                        onChange={this.handleOptionChange} />
                </Label>
                {this.renderOperationWidget()}
            </Form.Input>
        )
    }
}