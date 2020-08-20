import { NoteLane, NoteType, ChartElementType } from "./enums";
import { ChartElement } from "./ChartElement";

export interface Note extends ChartElement {
    lane: NoteLane
    note: NoteType
    flick: boolean
}

export class SingleNote implements Note {

    type: ChartElementType = ChartElementType.Note
    lane: NoteLane
    note: NoteType = NoteType.Single
    beat: number
    flick: boolean
    skill: boolean

    constructor({lane, beat, flick = false, skill = false}: {lane: NoteLane, beat: number, flick?: boolean, skill?: boolean}) {
        this.lane = lane
        this.beat = beat
        this.flick = flick
        this.skill = skill

        if (this.flick && this.skill) {
            throw 'A single note cannot be a flick and a skill at the same time!'
        }
    }
}

export class SlideNote implements Note {

    type: ChartElementType = ChartElementType.Note
    lane: NoteLane
    note: NoteType = NoteType.Single
    beat: number
    flick: boolean
    start: boolean
    end: boolean

    constructor({lane, beat, flick = false, start = false, end = false}: {lane: NoteLane, beat: number, flick?: boolean, start?: boolean, end?: boolean}) {
        this.lane = lane
        this.beat = beat
        this.flick = flick
        this.start = start
        this.end = end

        if (this.flick && !this.end) {
            throw 'Only an end slide note can be a flick!'
        }

        if (this.start && this.end) {
            throw 'A slide note cannot be both a start and an end!'
        }
    }
}