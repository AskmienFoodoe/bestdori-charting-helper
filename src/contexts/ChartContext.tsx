import React from 'react';
import { Chart } from '../common/Chart';

const ChartContext = React.createContext({} as IChartContextValue)

type stateType = {
    chart: Chart
}

interface IChartContextValue {
    chart: Chart
    updateChart: (chart: Chart) => void
}

export class ChartStore extends React.Component<{}, stateType> {

    state = {
        chart: new Chart([])
    }

    updateChart = (chart: Chart) => {
        this.setState({ chart: chart })
    }

    render() {
        const contextValue: IChartContextValue = {
            chart: this.state.chart,
            updateChart: this.updateChart
        }

        return (
            <ChartContext.Provider
                value={contextValue}
            >
                {this.props.children}
            </ChartContext.Provider>
        )
    }
}

export default ChartContext;