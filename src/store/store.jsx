import { configureStore } from "@reduxjs/toolkit";
import chapters_reducer from "./reducers/chapter_bar"
import inputs_reducer from './reducers/inputs_filter.js'
import save_author from "../store/reducers/save_author"
import companies from './reducers/companies'
import authors from './reducers/authors'


const store = configureStore({
    reducer: {
        data: chapters_reducer,
        inputs: inputs_reducer,
        save_author: save_author,
        companies: companies,
        authors: authors
        
    }
}) 

export default store