import React from 'react';

const LocalStorageContext = React.createContext({} as LocalStorageContextValue)

type stateType = {
    kokoro: boolean | string | null
}

interface LocalStorageContextValue {
    kokoro: boolean | string | null
    handleContextChange: (newContext: {}) => void
}

export class LocalStorageStore extends React.Component<{}, stateType> {

    state = {
        kokoro: localStorage.getItem('kokoro') ? localStorage.getItem('kokoro') : true
    }

    handleContextChange = (newContext: {[key: string]: any}) => {
        Object.keys(newContext).forEach(key => localStorage.setItem(key, newContext[key]))
        this.setState(newContext as stateType)
    }

    render() {
        const contextValue: LocalStorageContextValue = {
            kokoro: this.state.kokoro,
            handleContextChange: this.handleContextChange
        }

        return (
            <LocalStorageContext.Provider
                value={contextValue}
            >
                {this.props.children}
            </LocalStorageContext.Provider>
        )
    }
}

export default LocalStorageContext;