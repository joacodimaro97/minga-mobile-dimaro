import { createAction } from "@reduxjs/toolkit";

const chapter_bar = createAction(
    'chapter_bar', //nombre de la accion
    (object) => {
        return {
         payload:{
            title: object.title,
            order: object.order
         }   
        }
    }
)

const actions = {chapter_bar}

export default actions