import React from 'react'
import RangeSelector from '../selectors/RangeSelector'
import { Label, Form } from 'semantic-ui-react'
import PlacementTypeSelector from '../selectors/PlacementTypeSelector'
import PositionSelector from '../selectors/PositionSelector'
import { PlacementType, NoteLane, NoteType, SlideNotePos } from '../../common/enums'
import { BoundChartOperation } from '../../common/operations'
import { OperationWidget } from '../../common/OperationWidget'
import { Chart } from '../../common/Chart'
import deepEqual from 'deep-equal'
import { SlideNote } from '../../common/notes'

type propsType = {
    updateBoundOperation: (boundOperation: BoundChartOperation) => void
}

type stateType = {
    range: { start: number, end: number }
}

export class MirrorOperation extends React.Component<propsType, stateType> implements OperationWidget {

    state = {
        range: { start: 0, end: 0 }
    }

    handleRangeChange = (range: { start: number, end: number }) => {
        this.setState({ range: range })
    }

    bindOperation = (start: number, end: number) => {
        return (chart: Chart) => {
            const notesExcerpt = chart.cutNotesExcerpt(start, end)
            const mirroredNotes = notesExcerpt.map(note => {
                let newNote = Object.assign({}, note)
                newNote.lane = (8 - newNote.lane) as NoteLane
                if (newNote.note === NoteType.Slide) {
                    const newSlideNote = newNote as SlideNote
                    newSlideNote.pos = newSlideNote.pos === SlideNotePos.A ? SlideNotePos.B : SlideNotePos.A
                }
                return newNote
            })
            chart.addNotes(mirroredNotes, start, PlacementType.Place)
            return chart
        }
    }

    componentDidUpdate(prevProps: propsType, prevState: stateType) {
        if (!deepEqual(prevState, this.state, { strict: true })) {
            const { start, end } = this.state.range
            this.props.updateBoundOperation(this.bindOperation(start, end))
        }
    }

    render() {
        return (
            <Form.Input>
                <RangeSelector onRangeChange={this.handleRangeChange} />
            </Form.Input>
        )
    }
}