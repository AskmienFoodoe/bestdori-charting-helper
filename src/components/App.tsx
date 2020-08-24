import React, { FormEvent } from 'react'
import { Grid, Segment, Form, TextArea } from 'semantic-ui-react'

import OperationList from './OperationList'
import { Chart } from '../common/Chart'
import { MoveOperation } from './operation-widgets/MoveOperation'
import ChartContext from '../contexts/ChartContext'
import OperationSelector from './selectors/OperationSelector'



class App extends React.Component {

    static contextType = ChartContext
    context!: React.ContextType<typeof ChartContext>

    constructor(props: any) {
        super(props)
    }

    state = {
        inputChart: '',
        outputChart: '',
    }

    handleInputChange = (event: Event, {value} : {value: string}) => {
        this.setState({ inputChart: value })
    }

    updateChartInContext = () => {
        let inputChartAsJson = JSON.parse(this.state.inputChart)
        let inputChartAsChart = new Chart(inputChartAsJson)
        this.context.updateChart(inputChartAsChart)
    }

    handleSubmit = (outputChart: Chart) => {
        this.setState({outputChart: JSON.stringify(outputChart.chartElements)})
    }

    render() {
        return (
            <Form>
                <Grid columns={3} textAlign='center' style={{ height: '100vh', paddingLeft:'150px', paddingRight:'150px' }} verticalAlign='middle' centered>
                    <Grid.Column width={3} style={{minWidth: '250px'}}>
                        <Segment>
                            <Form.Field
                                style={{minHeight: '300px'}}
                                control={TextArea}
                                value={this.state.inputChart}
                                onChange={this.handleInputChange}
                                onBlur={this.updateChartInContext}
                                placeholder='Chart source code goes here...'
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={7} style={{minWidth: '850px'}}>
                        <Segment style={{textAlign: 'center', minWidth: '825px'}}>
                            <OperationList onSubmit={this.handleSubmit} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3} style={{minWidth: '250px'}}>
                        <Segment>
                            <Form.Field 
                                style={{minHeight: '300px'}}
                                control={TextArea} 
                                readOnly 
                                value={this.state.outputChart}
                                placeholder='Transformed chart source code appears here!'
                            />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}

export default App