import React from 'react'
import { Dropdown, Label, Input, DropdownProps, InputOnChangeData } from 'semantic-ui-react'
import { PositionSelectorOption } from '../../common/enums'
import deepEqual from 'deep-equal'

const options = [
    { key: 'note', text: 'Note', value: PositionSelectorOption.Note },
    { key: 'beat', text: 'Beat', value: PositionSelectorOption.Beat },
    { key: 'relative', text: 'ΔBeat', value: PositionSelectorOption.Relative }
]

type propsType = {
    onPositionChange: (state: positionSelectorState) => void
}

type positionSelectorState = {
    positionSelectorOption: PositionSelectorOption,
    position: number
}

export default class PositionSelector extends React.Component<propsType, positionSelectorState> {

    state = {
        positionSelectorOption: PositionSelectorOption.Relative,
        position: 0
    }

    handleOptionChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        let newPositionSelectorOption = data.value as PositionSelectorOption
        if (newPositionSelectorOption === PositionSelectorOption.Relative) {
            this.setState({ positionSelectorOption: newPositionSelectorOption, position: 0 })
        } else {
            this.setState({ positionSelectorOption: newPositionSelectorOption })
        }

    }

    handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        let newPosition = +data.value
        if (this.state.positionSelectorOption === PositionSelectorOption.Note) {
            newPosition = Math.round(newPosition)
        }
        this.setState({ position: +data.value })
    }

    componentDidUpdate(prevProps: propsType, prevState: positionSelectorState) {
        if (!deepEqual(prevState, this.state, { strict: true })) {
            this.props.onPositionChange(this.state)
        }
    }

    render() {
        return (
            <>
                <Label style={{ fontSize: '16px' }}>
                    <Dropdown
                        options={options}
                        value={this.state.positionSelectorOption}
                        onChange={this.handleOptionChange} />
                </Label>
                <Input
                    style={{ width: '80px' }}
                    type='number'
                    min={this.state.positionSelectorOption === PositionSelectorOption.Relative ? undefined : 0}
                    value={this.state.position}
                    onChange={this.handlePositionChange}
                />
            </>
        )
    }
}

export type { positionSelectorState }