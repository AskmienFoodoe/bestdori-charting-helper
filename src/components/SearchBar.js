import React from 'react'
import { Form, Input, Dropdown, Label, Button } from 'semantic-ui-react'

const options = [
    { key: 'subject', text: 'Subject', value: 'subject' },
    { key: 'course-num', text: 'Course Number', value: 'course-num' },
    { key: 'start-time', text: 'Start Time', value: 'start-time' },
    { key: 'end-time', text: 'End Time', value: 'end-time' },
    { key: 'attributes', text: 'Attributes', value: 'attributes' },
    { key: 'professor', text: 'Professor', value: 'professor' },
    { key: 'days', text: 'Days', value: 'days' },
]

const attributeOptions = [
    { key: 'alp', text: '(ALP) Arts, Lit & Performance', value: 'alp' },
    { key: 'cz', text: '(CZ) Civilizations', value: 'cz' },
    { key: 'ns', text: '(NS) Natural Sciences', value: 'ns' },
    { key: 'qs', text: '(QS) Quanitative Studies', value: 'qs' },
    { key: 'ss', text: '(SS) Social Sciences', value: 'ss' },
    { key: 'cci', text: '(CCI) Cross Cultural Inquiry', value: 'cci' },
    { key: 'ei', text: '(EI) Ethical Inquiry', value: 'ei' },
    { key: 'fl', text: '(FL) Foreign Language', value: 'fl' },
    { key: 'r', text: '(R) Research', value: 'r' },
    { key: 'sts', text: '(STS) Sci, Tech, and Society', value: 'sts' },
    { key: 'w', text: '(W) Writing', value: 'w' }
]

class SearchBar extends React.Component {

    state = {
        filterType: 'subject',
        value: ''
    }

    handleChange = (e, { value, category }) => {

        e.preventDefault()

        if (this.state.filterType === 'subject' || this.state.filterType === 'course-num' || this.state.filterType === 'professor' || this.state.filterType === 'attributes') {
            this.setState({ value: value }, () => this.props.handleChange(this.state.filterType, this.state.value))
        } else if (this.state.filterType === 'start-time' || this.state.filterType === 'end-time') {
            let preValue = this.state.value
            preValue[category] = value
            this.setState({ value: preValue }, () => this.props.handleChange(this.state.filterType, this.state.value))
        } else if (this.state.filterType === 'days') {
            let preValue = this.state.value
            if (preValue[category] === 'T') {
                preValue[category] = 'F'
            } else if (preValue[category] === 'F') {
                preValue[category] = null
            } else if (preValue[category] === null) {
                preValue[category] = 'T'
            }
            this.setState({ value: preValue }, () => this.props.handleChange(this.state.filterType, this.state.value))
        }
    }

    handleFilterChange = (e, { value }) => {
        if (value === 'subject' || value === 'course-num' || value === 'professor') {
            this.setState({ value: '', filterType: value }, () => this.props.handleChange(this.state.filterType, this.state.value))
        } else if (value === 'start-time' || value === 'end-time') {
            this.setState({ value: { after: null, before: null }, filterType: value })
        } else if (value === 'attributes') {
            this.setState({ value: [], filterType: value }, () => this.props.handleChange(this.state.filterType, this.state.value))
        } else if (value === 'days') {
            this.setState({ value: { mon: null, tues: null, wed: null, thur: null, fri: null }, filterType: value }, () => this.props.handleChange(this.state.filterType, this.state.value))
        }
    }

    buttonColor = (category) => {
        if (this.state.value === null) {
            return
        }

        if (this.state.value[category] === 'T') {
            return 'green'
        } else if (this.state.value[category] === 'F') {
            return 'red'
        } else {
            return null
        }
    }

    render() {
        if (this.state.filterType === 'subject' || this.state.filterType === 'course-num' || this.state.filterType === 'professor') {
            return (
                <Form.Input>
                    <Label>
                        <Dropdown
                            options={options}
                            value={this.state.filterType}
                            onChange={this.handleFilterChange} />
                    </Label>
                    <Input  type={this.state.filterType === 'course-num' ? 'number' : 'text'}
                            value={this.state.value}
                            onChange={this.handleChange}
                    />
                </Form.Input>
            )
        } else if (this.state.filterType === 'start-time' || this.state.filterType === 'end-time') {
            return (
                <Form.Input>
                    <Label>
                        <Dropdown
                            options={options}
                            value={this.state.filterType}
                            onChange={this.handleFilterChange} />
                    </Label>
                    <Input
                        label={{ basic: true, content: 'After:' }}
                        type='time'
                        value={this.state.value.after}
                        category='after'
                        onChange={this.handleChange}
                    />
                    <Input
                        label={{ basic: true, content: 'Before:' }}
                        type='time'
                        category='before'
                        value={this.state.value.before}
                        onChange={this.handleChange}
                    />
                </Form.Input>
            )
        } else if (this.state.filterType === 'attributes') {
            return (
                <Form.Input>
                    <Label>
                        <Dropdown
                            options={options}
                            value={this.state.filterType}
                            onChange={this.handleFilterChange} />
                    </Label>
                    <Dropdown multiple selection options={attributeOptions} value={this.state.value} onChange={this.handleChange} />
                </Form.Input>
            )
        } else if (this.state.filterType === 'days') {
            return (
                <Form.Input>
                    <Label>
                        <Dropdown
                            options={options}
                            value={this.state.filterType}
                            onChange={this.handleFilterChange} />
                    </Label>
                    
                        <Button
                            circular
                            content='M'
                            category='mon'
                            value={this.state.value.mon}
                            color={this.buttonColor('mon')}
                            onClick={this.handleChange}
                        />
                        <Button
                            circular
                            content='T'
                            category='tues'
                            value={this.state.value.tues}
                            color={this.buttonColor('tues')}
                            onClick={this.handleChange}
                        />
                        <Button
                            circular
                            content='W'
                            category='wed'
                            value={this.state.value.wed}
                            color={this.buttonColor('wed')}
                            onClick={this.handleChange}
                        />
                        <Button
                            circular
                            content='Th'
                            category='thur'
                            value={this.state.value.thur}
                            color={this.buttonColor('thur')}
                            onClick={this.handleChange}
                        />
                        <Button
                            circular
                            content='F'
                            category='fri'
                            value={this.state.value.fri}
                            color={this.buttonColor('fri')}
                            onClick={this.handleChange}
                        />
                    
                </Form.Input>
            )
        }
        return (
            <Form.Input
                label={<Dropdown
                    options={options}
                    value={this.state.filterType}
                    onChange={this.handleFilterChange} />}
                labelPosition='right'
                value={this.state.value}
                onChange={this.handleChange}
            />
        )
    }
}

export default SearchBar