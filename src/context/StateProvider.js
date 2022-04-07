import React, { createContext, useReducer } from 'react';
import '../App.css';

const initialState = {
    categorySelector : "",
    numberSelector : 1,
    updatedPlanetID : 1,
}

export const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( props ) => {
    const { children } = props;
    // console.log("Inside State Provider");
    // console.log(initialState.categorySelector);
    // console.log(initialState.numberSelector);
    
    const [ state, dispatch ] = useReducer(( state, action ) => {
        // console.log("Inside of dispatch");
        // console.log(state);
        // console.log(action.type);
        // console.log(action.payload);
    
        switch ( action.type ){
            case "update":
                return { ...state, [ action.payload.name ]: action.payload.value }
            case "hyperLinkCategoryUpdate":
                return { ...state, [ action.payload.name ]: action.payload.value }
            case "hyperLinkNumberUpdate":
                return { ...state, [ action.payload.name ]: action.payload.value }
            case "planetIDUpdate":
                return { ...state, [ action.payload.name ]: action.payload.value }
            default:
                console.log("The action.type was not matched anywhere");
                return state;
        }

        // fancy way to do if/else statements like the one below.
        // switch ( action.type ){
        //     case "change theme":
        //         let newTheme = "";
        //         action.payload === "btn-light-theme" ?
        //             newTheme = "btn-dark-theme"
        //                 : newTheme = "btn-light-theme"
        //         return { ...state, theme: newTheme }
            
        //     case "update":
        //         return { ...state, [ action.payload.name ]: action.payload.value }
            
        //     default:
        //         console.log("The action.type was not matched anywhere");
        //         return state;
        // }
        ////////////////////////////////////////////////////////////////////////////////////////////
        // OLD IF/ELSE STATEMENTS...............
        // if (action.type === "change theme") {
        //     let newTheme = "";

        //     action.payload === "btn-light-theme" ?
        //         newTheme = "btn-dark-theme"
        //             : newTheme = "btn-light-theme"

        //     return { ...state, theme: newTheme }
        // } else if (action.type === "update") {
        //     return { ...state, [ action.payload.name ]: action.payload.value }  // must use square brackets around a key in an object here.
        //                                                                   // becuase it needs to know it's a VARIABLE, and not the NAME
        //                                                                   // in the key/value pair.
        // } else {
        //     console.log("The action.type was not matched anywhere");
        // }

    }, initialState )
    
    return (
        <Provider value={ { state, dispatch }}>
            { children }
        </Provider>
    )
}

export default StateProvider;