import { Chart } from "./Chart";

export interface chartOperation {
    (chart: Chart): Chart
}