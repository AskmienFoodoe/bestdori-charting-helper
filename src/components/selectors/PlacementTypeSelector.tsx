import React from 'react'
import { Form, Dropdown, Label, Input, DropdownProps, InputOnChangeData } from 'semantic-ui-react'
import { PlacementType } from '../../common/enums'

const options = [
    { key: 'place', text: 'Place', value: PlacementType.Place },
    { key: 'replace', text: 'Replace', value: PlacementType.Replace },
    { key: 'insert', text: 'Insert', value: PlacementType.Insert }
]

type propsType = {

}

type stateType = {
    placementType: PlacementType
}

export default class PlacementTypeSelector extends React.Component<propsType, stateType> {

    state = {
        placementType: PlacementType.Place,
    }

    handleOptionChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        let newPlacementType = data.value as PlacementType
        this.setState({ placementType: newPlacementType })
    }

    render() {
        return (
            <>
                <Label style={{ fontSize: '16px' }}>
                    <Dropdown
                        options={options}
                        value={this.state.placementType}
                        onChange={this.handleOptionChange} />
                </Label>
            </>
        )
    }
}