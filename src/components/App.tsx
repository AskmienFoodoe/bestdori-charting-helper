import React, { FormEvent } from 'react'
import { Grid, Segment, Form, TextArea } from 'semantic-ui-react'

import OperationList from './OperationList'
import { Chart } from '../common/Chart'
import ChartContext from '../contexts/ChartContext'
import ChartInput from './ChartInput'

class App extends React.Component {

    static contextType = ChartContext
    context!: React.ContextType<typeof ChartContext>

    constructor(props: any) {
        super(props)
    }

    state = {
        outputChart: '',
    }

    handleSubmit = (outputChart: Chart) => {
        this.setState({outputChart: JSON.stringify(outputChart.chartElements)})
    }

    render() {
        return (
            <>
                <Grid columns={3} textAlign='center' style={{ height: '100vh', paddingLeft:'150px', paddingRight:'150px', paddingTop:'250px' }} centered>
                    <Grid.Column width={4} style={{minWidth: '250px'}}>
                        <Segment>
                            <h3 style={{textAlign: 'center'}}>Input</h3>
                            <ChartInput />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={7} style={{minWidth: '850px'}}>
                        <Segment style={{textAlign: 'center', minWidth: '825px'}}>
                            <h3>Operations</h3>
                            <div style={{marginBottom: '10px'}}>Note: most operations do not interact with BPM markers</div>
                            <OperationList onSubmit={this.handleSubmit} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4} style={{minWidth: '250px'}}>
                        <Segment style={{textAlign: 'center'}}>
                            <h3>Output</h3>
                            <Form>
                                <Form.Field 
                                    style={{minHeight: '300px'}}
                                    control={TextArea} 
                                    readOnly 
                                    value={this.state.outputChart}
                                    placeholder='Transformed chart source code appears here!'
                                />
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </>
        )
    }
}

export default App