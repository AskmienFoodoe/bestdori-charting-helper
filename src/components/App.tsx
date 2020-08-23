import React, { FormEvent } from 'react'
import { Grid, Segment, Form, TextArea } from 'semantic-ui-react'

import Operations from './Operations'
import { Chart } from '../common/Chart'
import RangeSelector from './selectors/RangeSelector'
import PositionSelector from './selectors/PositionSelector'
import PlacementTypeSelector from './selectors/PlacementTypeSelector'
import { OperationMove } from './operation-widgets/OperationMove'



class App extends React.Component {

    constructor(props: any) {
        super(props)
    }

    state = {
        inputChart: '',
        outputChart: '',
    }

    onInputChange = (event: Event, {value} : {value: string}) => {
        this.setState({ inputChart: value })
    }

    onSubmit = (event: FormEvent) => {
        let inputChartAsJson = JSON.parse(this.state.inputChart)
        console.log(inputChartAsJson)
        let inputChartAsChart = new Chart(inputChartAsJson)
        this.setState({outputChart: JSON.stringify(inputChartAsChart.chartElements)})
    }

    render() {

        return (
            <Form onSubmit={this.onSubmit}>
                <Grid columns={3} textAlign='center' style={{ height: '100vh', paddingLeft:'150px', paddingRight:'150px' }} verticalAlign='middle' centered>
                    <Grid.Column width={3} style={{minWidth: '250px'}}>
                        <Segment>
                            <Form.Field
                                style={{minHeight: '300px'}}
                                control={TextArea}
                                value={this.state.inputChart}
                                onChange={this.onInputChange}
                                placeholder='Chart source code goes here...'
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={7} style={{minWidth: '750px'}}>
                        <Segment style={{textAlign: 'center'}}>
                            <Operations />
                            <OperationMove />
                            <Form.Button content='Do It'/>
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