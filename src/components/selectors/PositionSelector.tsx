import React from 'react'
import { Form, Dropdown, Label, Input, DropdownProps, InputOnChangeData } from 'semantic-ui-react'
import { PositionSelectorOption } from '../../common/enums'
import { Chart } from '../../common/Chart'
import ChartContext from '../../contexts/ChartContext'

const options = [
    { key: 'note', text: 'Note', value: PositionSelectorOption.Note },
    { key: 'beat', text: 'Beat', value: PositionSelectorOption.Beat },
    { key: 'relative', text: 'ΔBeat', value: PositionSelectorOption.Relative }
]

type propsType = {
    onPositionChange: (position: number) => void
    rangeStart?: number
}

type stateType = {
    currentChart: Chart
    positionSelectorOption: PositionSelectorOption,
    position: number
}

export default class PositionSelector extends React.Component<propsType, stateType> {

    static contextType = ChartContext
    context!: React.ContextType<typeof ChartContext>

    state = {
        currentChart: new Chart([]),
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

    convertPositionToBeatPosition(chart: Chart, positionType: PositionSelectorOption, position: number, rangeStartAsBeatRange: number = 0): number {
        const notes = chart.getNotes()
        switch (positionType) {
            case PositionSelectorOption.Beat:
                return position
            case PositionSelectorOption.Note:
                if (!notes.length) {
                    return 0
                }
                const noteIndex = Math.max(Math.min(position - 1, notes.length - 1), 0)
                return notes[noteIndex].beat
            case PositionSelectorOption.Relative:
                return rangeStartAsBeatRange + position
        }
    }

    componentDidMount() {
        this.setState({ currentChart: this.context.chart })
    }

    componentDidUpdate(prevProps: propsType, prevState: stateType) {
        if (prevProps.rangeStart !== this.props.rangeStart ||
            prevState.position !== this.state.position ||
            prevState.positionSelectorOption !== this.state.positionSelectorOption ||
            this.context.chart !== this.state.currentChart) {
            this.props.onPositionChange(this.convertPositionToBeatPosition(this.context.chart, this.state.positionSelectorOption, this.state.position, this.props.rangeStart))
            this.setState({ currentChart: this.context.chart })
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