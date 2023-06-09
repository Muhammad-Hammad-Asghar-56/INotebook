import react, { Children, useState } from "react";
import notesContext from '../Context/notesContext'

const NoteState = (props) => {
    const notes = [
        {
            "_id": "6481ea0d9c610e60f8f2f4a2",
            "user": "648188ec6bb11a42e6ba077d",
            "title": "India",
            "description": "We are the neighbour of India",
            "tag": "L**d",
            "date": "1686235629217",
            "__v": 0
        }, {
            "_id": "6481ea0d9c610e60f8f2f4a2",
            "user": "648188ec6bb11a42e6ba077d",
            "title": "India",
            "description": "We are the neighbour of India",
            "tag": "L**d",
            "date": "1686235629217",
            "__v": 0
        }, {
            "_id": "6481ea0d9c610e60f8f2f4a2",
            "user": "648188ec6bb11a42e6ba077d",
            "title": "India",
            "description": "We are the neighbour of India",
            "tag": "L**d",
            "date": "1686235629217",
            "__v": 0
        }, {
            "_id": "6481ea0d9c610e60f8f2f4a2",
            "user": "648188ec6bb11a42e6ba077d",
            "title": "India",
            "description": "We are the neighbour of India",
            "tag": "L**d",
            "date": "1686235629217",
            "__v": 0
        },{
            "_id": "6481ea0d9c610e60f8f2f4a2",
            "user": "648188ec6bb11a42e6ba077d",
            "title": "India",
            "description": "We are the neighbour of India",
            "tag": "L**d",
            "date": "1686235629217",
            "__v": 0
        }, {
            "_id": "6481ea0d9c610e60f8f2f4a2",
            "user": "648188ec6bb11a42e6ba077d",
            "title": "India",
            "description": "We are the neighbour of India",
            "tag": "L**d",
            "date": "1686235629217",
            "__v": 0
        }, {
            "_id": "6481ea0d9c610e60f8f2f4a2",
            "user": "648188ec6bb11a42e6ba077d",
            "title": "India",
            "description": "We are the neighbour of India",
            "tag": "L**d",
            "date": "1686235629217",
            "__v": 0
        }, {
            "_id": "6481ea0d9c610e60f8f2f4a2",
            "user": "648188ec6bb11a42e6ba077d",
            "title": "India",
            "description": "We are the neighbour of India",
            "tag": "L**d",
            "date": "1686235629217",
            "__v": 0
        }
    ]
    const [noteState,SetnoteState]=useState(notes);
    return (
        <notesContext.Provider value={{noteState,SetnoteState}}>
            {props.children}
        </notesContext.Provider>
    )
}

export default NoteState;
