import { ChartElement } from "./ChartElement";
import { ChartElementType, NoteType, PlacementType } from "./enums";
import { Note, SingleNote, SlideNote } from "./notes";
import { BpmMarker } from "./BpmMarker";

export class Chart {

    chartElements: ChartElement[]
    numNotes: number

    constructor(chartElements: ChartElement[]) {
        this.chartElements = chartElements.map((element: ChartElement) => {
            if (element.type == ChartElementType.Note) {
                let note = element as Note
                if (note.note == NoteType.Single) {
                    return new SingleNote(note)
                } else if (note.note == NoteType.Slide) {
                    let slideNote = note as SlideNote
                    return new SlideNote(slideNote)
                }
            } else if (element.type == ChartElementType.System) {
                let bpmMarker = element as BpmMarker
                return new BpmMarker(bpmMarker)
            }
            return {} as ChartElement //Ripperino in Pepperino
        })
        this.numNotes = this.getNotes().length
    }

    getNotes(): Note[] {
        return this.chartElements.filter(element => element.type === ChartElementType.Note).sort((a, b) => a.beat - b.beat) as Note[]
    }

    //Ignores BPM markers
    //Any space with no notes on the tails is trimmed, so the range of the excerpt is based on the first and last notes, not startBeat and endBeat
    private extractNotesExcerpt(startBeat: number, endBeat: number, cut: boolean): Note[] {
        const filterLogic = (element: ChartElement) => {
            return element.type === ChartElementType.Note && element.beat >= startBeat && element.beat <= endBeat
        }

        const excerpt = this.chartElements.filter(filterLogic)
        if (cut) {
            this.chartElements = this.chartElements.filter(element => !filterLogic(element))
        }
        return excerpt as Note[]
    }

    cutNotesExcerpt(startBeat: number, endBeat: number): Note[] {
        return this.extractNotesExcerpt(startBeat, endBeat, true)
    }

    copyNotesExcerpt(startBeat: number, endBeat: number): Note[] {
        return this.extractNotesExcerpt(startBeat, endBeat, false)
    }

    addNotes(notes: Note[], beatPosition: number, placementType: PlacementType): Chart {
        if (!notes.length) {
            return this
        }

        const sortedNotes = notes.sort((a, b) => a.beat - b.beat)
        const firstBeat = sortedNotes[0].beat
        const normalizedNotes = sortedNotes.map(note => {
            let newNote = Object.assign({}, note)
            newNote.beat -= firstBeat
            return newNote
        })
        const range = normalizedNotes[normalizedNotes.length - 1].beat

        switch (placementType) {
            case PlacementType.Place:
                break
            case PlacementType.Replace:
                this.chartElements = this.chartElements.filter(element => element.type !== ChartElementType.Note ||
                                                                          element.beat > beatPosition + range || 
                                                                          element.beat < beatPosition)
                break
            //Insert DOES also displace BPM Markers
            case PlacementType.Insert:
                this.chartElements = this.chartElements.map(element => {
                    let newElement = Object.assign({}, element)
                    if (newElement.beat >= beatPosition) {
                        newElement.beat += range
                    }
                    return newElement
                })
                break
        }
        this.chartElements = this.chartElements.concat(normalizedNotes).sort((a, b) => a.beat - b.beat) as Note[]
        
        return new Chart(this.chartElements)
    }
}