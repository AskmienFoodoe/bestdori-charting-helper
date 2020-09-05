import { Operation } from "../common/enums";

export const popups: {[key: string]: string} = {
    [Operation.Move]: 'Moves the selected notes to a different position.',
    [Operation.Copy]: 'Makes a copy of the selected notes and moves them to a different position.',
    [Operation.Mirror]: 'Mirrors the selected notes across the center. Also changes Slides from A to B and vice versa.',
    [Operation.Reverse]: 'Reverses the order of the selected notes. Slide end flicks are not preserved.',
    [Operation.ConvertToFlick]: 'Converts non-flicks in the selected range into flicks.',
    [Operation.SetInitialBpm]: 'You could just do this in the editor, but why not do it here?',
    [Operation.GenerateTapPattern]: 'Generates a pattern of tap notes and places them in the chart.',
    [Operation.GenerateASlidePattern]: 'Generates a pattern of Type-A slide notes and places them in the chart.',
    [Operation.GenerateBSlidePattern]: 'Generates a pattern of Type-B slide notes and places them in the chart.',
}