import { Chart } from "./Chart";

export interface ChartOperation {
    (chart: Chart, ...any: any[]): Chart
}

export interface BoundChartOperation extends ChartOperation {
    (chart: Chart): Chart
}

export interface ChartOperationBinder {
    (...any: any[]): BoundChartOperation
}