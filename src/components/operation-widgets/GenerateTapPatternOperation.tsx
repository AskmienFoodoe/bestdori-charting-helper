import React from 'react'
import deepEqual from 'deep-equal'
import { Label, Form, Input, InputOnChangeData, Popup, List, Icon } from 'semantic-ui-react'
import PlacementTypeSelector from '../selectors/PlacementTypeSelector'
import PositionSelector, { positionSelectorState } from '../selectors/PositionSelector'
import { PlacementType, PositionSelectorOption, Interval, NoteLane } from '../../common/enums'
import { BoundChartOperation, convertPositionToBeatPosition } from '../../common/operations'
import { OperationWidget } from '../../common/OperationWidget'
import { Chart } from '../../common/Chart'
import IntervalSelector from '../selectors/IntervalSelector'
import { SingleNote } from '../../common/notes'

const regex = /^((([fs]?[1-7])*,)*([fs]?[1-7])*)$/

type propsType = {
    updateBoundOperation: (boundOperation: BoundChartOperation) => void
}

type stateType = {
    pattern: string,
    interval: Interval,
    length: number,
    positionState: positionSelectorState,
    placementType: PlacementType,
    error: boolean
}

export default class GenerateTapPatternOperation extends React.Component<propsType, stateType> implements OperationWidget {

    state = {
        pattern: '',
        interval: Interval.Quarter,
        length: 0,
        positionState: {
            positionSelectorOption: PositionSelectorOption.Note,
            position: 0
        },
        placementType: PlacementType.Place,
        error: false
    }

    handlePatternChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({ pattern: data.value, error: false })
    }

    handleIntervalChange = (interval: Interval) => {
        this.setState({ interval: interval })
    }

    handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({ length: Math.round(+data.value) })
    }

    handlePlacementTypeChange = (placementType: PlacementType) => {
        this.setState({ placementType: placementType })
    }

    handlePositionChange = (positionState: positionSelectorState) => {
        this.setState({ positionState: positionState })
    }

    private generateNotePattern(pattern: string, interval: Interval): { notePattern: SingleNote[], offset: number } {
        if (!regex.exec(pattern)) {
            throw new Error('Invalid pattern!')
        }

        const notePattern: SingleNote[] = []
        let flick = false
        let skill = false
        let beat = 0
        for (let i = 0; i < pattern.length; i++) {
            const char = pattern.charAt(i)
            switch (char) {
                case 'f':
                    flick = true
                    break
                case 's':
                    skill = true
                    break
                case ',':
                    beat += interval
                    break
                default:
                    const lane = parseInt(char) as NoteLane
                    notePattern.push(new SingleNote({ lane, beat, flick, skill }))
                    flick = false
                    skill = false
            }
        }

        return { notePattern, offset: beat }
    }

    bindOperation = (pattern: string, interval: Interval, length: number, positionState: positionSelectorState, placementType: PlacementType) => {
        try {
            let { notePattern, offset } = this.generateNotePattern(pattern, interval)
            offset += interval

            if (notePattern.length === 0) {
                return (chart: Chart) => chart
            }

            const notesExcerpt: SingleNote[] = []
            for (let i = 0; i < length; i++) {
                const newNote = new SingleNote(notePattern[i % notePattern.length])
                newNote.beat += offset * Math.floor(i / notePattern.length)
                notesExcerpt.push(newNote)
            }

            return (chart: Chart) => {
                const position = convertPositionToBeatPosition(chart, positionState)
                chart.addNotes(notesExcerpt, position, placementType)
                return chart
            }
        } catch (error) {
            this.setState({ error: true })
            return (chart: Chart) => chart
        }
    }

    componentDidUpdate(prevProps: propsType, prevState: stateType) {
        if (!deepEqual(prevState, this.state, { strict: true })) {
            const { pattern, interval, length, positionState, placementType } = this.state
            this.props.updateBoundOperation(this.bindOperation(pattern, interval, length, positionState, placementType))
        }
    }

    render() {
        return (
            <Form.Input>
                <Popup on={['hover']} position='top left' mouseEnterDelay={650} trigger={
                    <Input style={{ width: '70px' }} value={this.state.pattern} icon={this.state.error ? 'warning circle' : ''} onChange={this.handlePatternChange} />
                }>
                    Generates a pattern based on the following rules:
                    <List bulleted>
                        <List.Item>
                            Placing the numbers 1-7 puts a note in the respective lane. Use multiple for doubles <del>or triples</del>. <em>Avoid putting the same number twice.</em>
                        </List.Item>
                        <List.Item>
                            Placing a comma (,) advances the beat based on the interval selected in the dropdown to the right.
                        </List.Item>
                        <List.Item>
                            Placing either 'f' or 's' directly before a number will make that note a flick or skill, respectively.
                        </List.Item>
                        <List.Item>
                            If you see this <Icon name='warning circle' /> icon, your pattern is invalid and the operation will no-op.
                        </List.Item>
                    </List>
                </Popup>
                <Label style={{ fontSize: '16px' }} basic>per</Label>
                <IntervalSelector onIntervalChange={this.handleIntervalChange} />
                <Label style={{ fontSize: '16px' }} basic>beats for</Label>
                <Input style={{ width: '60px' }} value={this.state.length} type='number' min={0} onChange={this.handleLengthChange} />
                <Label style={{ fontSize: '16px' }} basic>steps &</Label>
                <PlacementTypeSelector onPlacementTypeChange={this.handlePlacementTypeChange} />
                <Label style={{ fontSize: '16px' }} basic>at</Label>
                <PositionSelector excludeRelative onPositionChange={this.handlePositionChange} />
            </Form.Input>
        )
    }
}