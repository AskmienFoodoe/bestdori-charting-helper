import React from 'react'
import { Dropdown, Label, Input, DropdownProps, InputOnChangeData } from 'semantic-ui-react'
import { RangeSelectorOption } from '../../common/enums'
import { Chart } from '../../common/Chart'
import ChartContext from '../../contexts/ChartContext'
import deepEqual from 'deep-equal'

const options = [
    { key: 'note', text: 'Notes', value: RangeSelectorOption.Note },
    { key: 'beat', text: 'Beats', value: RangeSelectorOption.Beat },
    //{ key: 'prev', text: 'Prev', value: RangeSelectorOption.Prev }
]

type propsType = {
    onRangeChange: ({ start, end }: { start: number, end: number }) => void
}

type stateType = {
    currentChart: Chart
    rangeSelectorOption: RangeSelectorOption,
    start: number,
    end: number
}

export default class RangeSelector extends React.Component<propsType, stateType> {

    static contextType = ChartContext
    context!: React.ContextType<typeof ChartContext>

    state = {
        currentChart: new Chart([]),
        rangeSelectorOption: RangeSelectorOption.Note,
        start: 0,
        end: 0
    }

    handleOptionChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        this.setState({ rangeSelectorOption: data.value as RangeSelectorOption })
    }

    handleStartChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        let startValue = +data.value
        if (this.state.rangeSelectorOption === RangeSelectorOption.Note) {
            startValue = Math.round(startValue)
        }
        this.setState({ start: startValue })
    }

    handleEndChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        let endValue = +data.value
        if (this.state.rangeSelectorOption === RangeSelectorOption.Note) {
            endValue = Math.round(endValue)
        }
        this.setState({ end: endValue })
    }

    fixEndtoStart = () => {
        if (this.state.start > this.state.end) {
            this.setState({ end: this.state.start })
        }
    }

    fixStarttoEnd = () => {
        if (this.state.start > this.state.end) {
            this.setState({ start: this.state.end })
        }
    }

    convertRangeToBeatRange(chart: Chart, rangeType: RangeSelectorOption, rangeStart: number, rangeEnd: number): { start: number, end: number } {
        switch (rangeType) {
            case RangeSelectorOption.Beat:
                return { start: rangeStart, end: rangeEnd }
            case RangeSelectorOption.Note:
                const notes = chart.getNotes()
                if (!notes.length) {
                    return { start: 0, end: 0 }
                }
                const firstNoteIndex = Math.max(rangeStart - 1, 0)
                const lastNoteIndex = Math.max(Math.min(rangeEnd - 1, notes.length - 1), 0)
                return { start: notes[firstNoteIndex].beat, end: notes[lastNoteIndex].beat }
        }
    }

    componentDidMount() {
        this.setState({ currentChart: this.context.chart, end: this.context.chart.numNotes })
    }

    componentDidUpdate(prevProps: propsType, prevState: stateType) {
        if (!deepEqual(prevState, this.state, { strict: true }) ||
            this.context.chart !== this.state.currentChart) {
            this.props.onRangeChange(this.convertRangeToBeatRange(this.context.chart, this.state.rangeSelectorOption, this.state.start, this.state.end))
            this.setState({ currentChart: this.context.chart })
        }
    }

    render() {
        return (
            <>
                <Label style={{ fontSize: '16px' }}>
                    <Dropdown
                        options={options}
                        value={this.state.rangeSelectorOption}
                        onChange={this.handleOptionChange} />
                </Label>
                <Input
                    style={{ width: '80px' }}
                    type='number'
                    start={0}
                    min={0}
                    value={this.state.start}
                    onChange={this.handleStartChange}
                    onBlur={this.fixEndtoStart}
                />
                <Label style={{ fontSize: '16px' }} basic>to</Label>
                <Input
                    style={{ width: '80px' }}
                    type='number'
                    start={0}
                    value={this.state.end}
                    onChange={this.handleEndChange}
                    onBlur={this.fixStarttoEnd}
                />
            </>
        )
    }
}