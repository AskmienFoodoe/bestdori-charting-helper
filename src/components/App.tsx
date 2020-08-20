import React, { Fragment } from 'react'
import { Grid, Segment, Header, Form, TextArea } from 'semantic-ui-react'



class App extends React.Component {

    constructor(props: any) {
        super(props)
    }

    state = {

    }

    render() {

        return (
            <Fragment>
                <Grid columns={3} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' centered>
                    <Grid.Column>
                        <TextArea float />
                    </Grid.Column>
                    <Grid.Column>
                        <Header color='grey' textAlign='center' style={{ fontSize: "60px", letterSpacing: "4.8px" }}>
                            Course Scheduler
                    </Header>
                        <Header as='h4' color='grey' textAlign='center'>
                            Please Enter Your NetID
                    </Header>
                        <Segment clearing raised style={{ borderColor: "white" }}>
                            <Form size='mini'>
                                <Form.Input
                                    fluid
                                    placeholder='netid'
                                />
                                <Form.Button color='violet' size='small' fluid>
                                    Enter
                            </Form.Button>

                            </Form>

                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <TextArea float />
                    </Grid.Column>
                </Grid>
            </Fragment>
        )
    }
}

export default App