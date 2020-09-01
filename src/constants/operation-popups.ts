import { Operation } from "../common/enums";

export const popups: {[key: string]: string} = {
    [Operation.Move]: `Moves the selected notes to a different position.`,
    [Operation.Copy]: `Makes a copy of the selected notes and moves them to a different position.`,
    [Operation.Mirror]: `Mirrors the selected notes across the center.`,
    [Operation.Reverse]: `Reverses the order of the selected notes. Slide flicks are not preserved.`,
}