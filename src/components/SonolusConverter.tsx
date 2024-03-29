import React from "react";
import axios from "axios";
import ChartContext from "../contexts/ChartContext";
import { Chart } from "../common/Chart";
import { Form, Grid, Segment, TextArea, Icon, Button, ButtonProps } from "semantic-ui-react";
import { bpmToSeconds, convert } from '../common/sonolus/bestdori-conversion-tools'
import { compile } from '../common/sonolus/compiler'

export default class SonolusConverter extends React.Component {
    static contextType = ChartContext
    context!: React.ContextType<typeof ChartContext>

    state = {
        inputChart: '',
        level: '',
        script: '',
        levelScript: '',
        options: '',
        displayOptions: ''
    }

    handleInputChange = (event: Event, { value }: { value: string }) => {
        this.setState({ inputChart: value })
    }

    updateChartInContext = () => {
        let inputChartAsJson = JSON.parse(this.state.inputChart)
        let inputChartAsChart = new Chart(inputChartAsJson)
        this.context.updateChart(inputChartAsChart)
    }

    handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps) => {
        try {
            const { script, levelScript, options } = this.state
            const entities = convert(bpmToSeconds(this.context.chart.chartElements))
            const level = compile(script, levelScript, entities)
            this.setState({ level: JSON.stringify(level), displayOptions: JSON.stringify(options) })
        } catch(err) {
            console.log(err)
        }
    }

    async componentDidMount() {
        const chartElements = this.context.chart.chartElements
        if (chartElements.length) {
            this.setState({inputChart: JSON.stringify(this.context.chart.chartElements)})
        }

        const engineClient = axios.create({ baseURL: 'https://raw.githubusercontent.com/NonSpicyBurrito/sonolus-bandori-engine/master'})
        this.setState({
            script: (await engineClient.get('/script.txt')).data,
            levelScript: (await engineClient.get('/script.json')).data,
            options: (await engineClient.get('/options.json')).data
        })
    }

    render() {
        return (
            <Form>
                <Grid columns={3} textAlign='center' style={{ height: '100vh', paddingLeft: '150px', paddingRight: '150px' }} verticalAlign='middle' centered>
                    <Grid.Column width={4} style={{ minWidth: '250px' }}>
                        <Segment style={{textAlign: 'center'}}>
                            <h3>Input</h3>
                            <Form.Field
                                style={{ minHeight: '814px' }}
                                control={TextArea}
                                value={this.state.inputChart}
                                onChange={this.handleInputChange}
                                onBlur={this.updateChartInContext}
                                placeholder='Chart source code goes here...'
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2} style={{textAlign: 'center'}}>
                        <Button color='yellow' animated onClick={this.handleClick}>
                            <Button.Content hidden>
                                <Icon name='long arrow alternate right' />
                            </Button.Content>
                            <Button.Content visible>
                                Convert
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={4} style={{ minWidth: '250px' }}>
                        <Segment style={{textAlign: 'center'}}>
                            <h3>Output</h3>
                            <Form.Field
                                style={{ minHeight: '400px' }}
                                control={TextArea}
                                readOnly
                                value={this.state.level}
                                placeholder='level.json appears here!'
                            />
                            <Form.Field
                                style={{ minHeight: '400px' }}
                                control={TextArea}
                                readOnly
                                value={this.state.displayOptions}
                                placeholder='options.json appears here!'
                            />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}
