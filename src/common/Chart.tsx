import { ChartElement } from "./ChartElement";
import { ChartElementType, NoteType } from "./enums";
import { Note, SingleNote, SlideNote } from "./notes";
import { BpmMarker } from "./BpmMarker";

export class Chart {
    chartElements: ChartElement[]

    constructor(chartElements: ChartElement[]) {
        this.chartElements = chartElements.map((element: ChartElement) => {
            if (element.type == ChartElementType.Note) {
                let note = element as Note
                if (note.note == NoteType.Single) {
                    return new SingleNote(note)
                } else if (note.note == NoteType.Slide) {
                    return new SlideNote(note)
                }
            } else if (element.type == ChartElementType.System) {
                let bpmMarker = element as BpmMarker
                return new BpmMarker(bpmMarker)
            }
            return {} as ChartElement //Ripperino in Pepperino
        })
    }


    getNotes() {

    }
}