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