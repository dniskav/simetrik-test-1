import React, { createContext, useReducer } from 'react';

const initialState = {
    list1: [],
    list2: [],
    selectedList: [],
};

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LIST_1':
            const { list1 } = action;
            return { ...state, list1 };
        case 'SET_LIST_2':
            const { list2 } = action;
            return { ...state, list2 };
        case 'SET_SELECTED_LIST':
            const { selectedList } = action;
            return { ...state, selectedList };
        default:
            return state;
    }
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
};

export const Context = createContext(initialState);

export default Store;
