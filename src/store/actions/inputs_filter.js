import { createAction } from "@reduxjs/toolkit";

const inputs_filter = createAction(
        'inputs_filter',
        (obj)=>{
             return {
                payload: {
                        title: obj.title,
                        categories :obj.categories 
                        } 
                } 
        }
)

const actions = { inputs_filter }

export default actions