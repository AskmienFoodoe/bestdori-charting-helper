import { Chart } from "./Chart";
import { RangeSelectorOption, PositionSelectorOption } from "./enums";

export interface ChartOperation {
    (chart: Chart, ...any: any[]): Chart
}

export interface BoundChartOperation extends ChartOperation {
    (chart: Chart): Chart
}

export interface ChartOperationBinder {
    (chart: Chart, ...any: any[]): BoundChartOperation
}

function convertRangeToBeatRange(chart: Chart, rangeType: RangeSelectorOption, rangeStart: number, rangeEnd: number): { start: number, end: number } {
    switch(rangeType) {
        case RangeSelectorOption.Beat:
            return { start: rangeStart, end: rangeEnd }
        case RangeSelectorOption.Note:
            const notes = chart.getNotes()
            const firstNoteIndex = Math.max(rangeStart-1, 0)
            const lastNoteIndex = Math.max(Math.min(rangeEnd-1, notes.length-1), 0)
            return { start: notes[firstNoteIndex].beat, end: notes[lastNoteIndex].beat}
    }
}

function convertPositionToBeatPosition(chart: Chart, positionType: PositionSelectorOption, position: number, rangeStartAsBeatRange: number = 0): number {
    const notes = chart.getNotes()
    switch(positionType) {
        case PositionSelectorOption.Beat:
            return position
        case PositionSelectorOption.Note:
            const noteIndex = Math.max(Math.min(position-1, notes.length-1), 0)
            return notes[noteIndex].beat
        case PositionSelectorOption.Relative:
            return rangeStartAsBeatRange + position
    }
}