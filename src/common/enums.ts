export enum ChartElementType {
    System = 'System',
    Note = 'Note'
}

export enum NoteType {
    Single = 'Single',
    Slide = 'Slide',
    Long = 'Long'
}

export type NoteLane = 1|2|3|4|5|6|7

export enum SlideNotePos {
    A = 'A',
    B = 'B'
}

export enum RangeSelectorOption {
    Note = 'Note',
    Beat = 'Beat',
    //Prev = 'Prev'
}

export enum PositionSelectorOption {
    Note = 'Note',
    Beat = 'Beat',
    Relative = 'Relative'
}

export enum PlacementType {
    Place = 'Place',
    Replace = 'Replace',
    Insert = 'Insert'
}

export enum Operation {
    Move = 'Move',
    Copy = 'Copy',
    Mirror = 'Mirror',
    Reverse = 'Reverse',
    ConvertToFlick = 'Convert To Flick'
}