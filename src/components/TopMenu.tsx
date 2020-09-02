import React, { useContext } from "react";
import { Sticky, Menu, Icon, Checkbox, CheckboxProps } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import LocalStorageContext from "../contexts/LocalStorageContext";

export default function TopMenu() {

    const context = useContext(LocalStorageContext)

    return (
        <Sticky>
            <Menu size='massive'>
                <Menu.Item as={Link} to='/' content='Charting Tools' active={useLocation().pathname === '/'} />
                <Menu.Item as={Link} to='/sonolus-converter' content='Bestdori-to-Sonolus Converter' active={useLocation().pathname === '/sonolus-converter'} />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Checkbox 
                            toggle
                            checked={context.kokoro as boolean}
                            label={context.kokoro ? 'Kokoro ❤️' : 'Nokoro 💔'}
                            onChange={(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {context.handleContextChange({kokoro: data.checked})}}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='info circle' />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Sticky>
    )    
}