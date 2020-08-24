import React from 'react'
import { Dropdown, Label, DropdownProps, Form } from 'semantic-ui-react'
import { BoundChartOperation } from '../../common/operations'
import { Chart } from '../../common/Chart'
import { MoveOperation } from '../operation-widgets/MoveOperation'
import { Operation } from '../../common/enums'

const options = [
    { key: 'move', text: 'Move', value: Operation.Move },
]

type propsType = {

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
        
    }

    renderOperationWidget() {
        switch (this.state.operationOption) {
            case Operation.Move:
                return <MoveOperation updateBoundOperation={this.updateBoundOperation}/>
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