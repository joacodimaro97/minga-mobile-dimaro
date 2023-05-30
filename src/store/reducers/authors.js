import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/authors";

const { get_authors, update_authors } = actions

let initialState = {
    active: [],
    inactive: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            get_authors.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    active: action.payload.authors.active,
                    inactive: action.payload.authors.inactive
                }
                return newState
            }
        )
        .addCase(
            update_authors.fulfilled,
            (state, action) => {
                
                if (action.payload.active) { //verifica si active esta en true
                    let newState = {
                        ...state,
                        inactive: state.inactive?.filter(each => each._id !== action.payload.author._id),  //elimina los authores inactives
                        active: [...state.active, action.payload.author]  //se agregan los authores actives
                        
                    }
                    return newState
                } else {   //si active es false
                    let newState = {
                        ...state,
                        active: state.active?.filter(each => each._id !== action.payload.author._id),  //elimina los activos
                        inactive: [...state.inactive, action.payload.author]  //agrega los inactivos
                    }
                    return newState
                }
            }
        )
)

export default reducer