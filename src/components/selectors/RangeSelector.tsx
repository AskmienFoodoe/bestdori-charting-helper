import React from 'react'
import { Form, Dropdown, Label, Input, DropdownProps, InputOnChangeData } from 'semantic-ui-react'
import { RangeSelectorOption } from '../../common/enums'

const options = [
    { key: 'note', text: 'Note', value: RangeSelectorOption.Note },
    { key: 'beat', text: 'Beat', value: RangeSelectorOption.Beat },
    //{ key: 'prev', text: 'Prev', value: RangeSelectorOption.Prev }
]

type stateType = {
    rangeSelectorOption: RangeSelectorOption,
    min: number,
    max: number
}

type propsType = {

}

export default class RangeSelector extends React.Component<propsType, stateType> {

    //TODO: set Chart min/maxes as Context
    state = {
        rangeSelectorOption: RangeSelectorOption.Note,
        min: 0,
        max: 0
    }

    handleOptionChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        this.setState({ rangeSelectorOption: data.value as RangeSelectorOption })
    }

    handleMinChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        let minValue = +data.value
        if (this.state.rangeSelectorOption === RangeSelectorOption.Note) {
            minValue = Math.round(minValue)
        }
        this.setState({ min: minValue })
    }

    handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        let maxValue = +data.value
        if (this.state.rangeSelectorOption === RangeSelectorOption.Note) {
            maxValue = Math.round(maxValue)
        }
        this.setState({ max: maxValue })
    }

    fixMaxtoMin = () => {
        if (this.state.min > this.state.max) {
            this.setState({ max: this.state.min })
        }
    }

    fixMintoMax = () => {
        if (this.state.min > this.state.max) {
            this.setState({ min: this.state.max })
        }
    }

    render() {
        return (
            <Form.Input>
                <Label style={{ fontSize: '16px' }}>
                    <Dropdown
                        options={options}
                        value={this.state.rangeSelectorOption}
                        onChange={this.handleOptionChange} />
                </Label>
                <Input
                    style={{ width: '80px' }}
                    type='number'
                    min={0}
                    value={this.state.min}
                    onChange={this.handleMinChange}
                    onBlur={this.fixMaxtoMin}
                />
                <Label style={{ fontSize: '16px' }} basic>to</Label>
                <Input
                    style={{ width: '80px' }}
                    type='number'
                    min={0}
                    value={this.state.max}
                    onChange={this.handleMaxChange}
                    onBlur={this.fixMintoMax}
                />
            </Form.Input>
        )
    }
}