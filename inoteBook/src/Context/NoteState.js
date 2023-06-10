import react, { Children, useState } from "react";
import notesContext from '../Context/notesContext'

const NoteState = (props) => {

    const baseURL="http://localhost:5000";
    
    const [noteState,SetnoteState]=useState([]);
    
    const getAllNote=async ()=>{
        //              API Call
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ4MTg4ZWM2YmIxMWE0MmU2YmEwNzdkIiwiaWF0IjoxNjg2MjI2MjU2fQ.mZCLISx1mNgsfkOpa2O7uRjzJLUl9Td8kH_4c5mUJN0' },
        };
        const response = await fetch(`${baseURL}/note/getNotes`, requestOptions);
        const data = await response.json();
        SetnoteState(data);
    }
    
    const getSingleNote=async (NoteID)=>{
        //              API Call
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json','auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ4MTg4ZWM2YmIxMWE0MmU2YmEwNzdkIiwiaWF0IjoxNjg2MjI2MjU2fQ.mZCLISx1mNgsfkOpa2O7uRjzJLUl9Td8kH_4c5mUJN0' },
        };
        const response = await fetch(`${baseURL}/note/getNote/${NoteID}`, requestOptions);
        const data = await response.json();
        return data;
    }
    const addNewNote=async (title,tag,description)=>{
        //              API Call
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ4MTg4ZWM2YmIxMWE0MmU2YmEwNzdkIiwiaWF0IjoxNjg2MjI2MjU2fQ.mZCLISx1mNgsfkOpa2O7uRjzJLUl9Td8kH_4c5mUJN0' },
            body: JSON.stringify({ title: title,tag:tag,description:description })
            
        };
        const response = await fetch(`${baseURL}/note/addNote`, requestOptions);
        const data = await response.json();
        
        //              Add Logic
        // const newNote={
        //     "_id": "6481ea0d9c610e60f8f2f4a2",
        //     "user": "648188ec6bb11a42e6ba077d",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "1686235629217",
        //     "__v": 0
        // }
        // // Todo the APi call
        // SetnoteState([newNote,...noteState]);
        await getAllNote()
        console.log({Title:"Now Node has been arrived"});
    }




    const deleteNote=async (id)=>{
        //              API Call
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json','auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ4MTg4ZWM2YmIxMWE0MmU2YmEwNzdkIiwiaWF0IjoxNjg2MjI2MjU2fQ.mZCLISx1mNgsfkOpa2O7uRjzJLUl9Td8kH_4c5mUJN0' },
        };
        const response = await fetch(`${baseURL}/note/deleteNote/${id}`, requestOptions);
        const data = await response.json();
        console.log(data)
        //              Add Logic
        console.log(id+" have been arrived to delete");
        await getAllNote();
    }
    
    
    
    
    const editNote=async (id,title,tag,description)=>{
        console.log({Title:"Now Node has been arrived to edit",data: {Title:title,Tag:tag,Desc:description}});
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQ4MTg4ZWM2YmIxMWE0MmU2YmEwNzdkIiwiaWF0IjoxNjg2MjI2MjU2fQ.mZCLISx1mNgsfkOpa2O7uRjzJLUl9Td8kH_4c5mUJN0' },
            body: JSON.stringify({ title: title,tag:tag,description:description })
        };
        const response = await fetch(`${baseURL}/note/updateNoteOnID/${id}`, requestOptions);
        const data = await response.json();
        console.log(data)
        //              Add Logic
        console.log(id+" have been arrived to delete");
        await getAllNote();
    }
    
    
    return (
        <notesContext.Provider value={{noteState,addNewNote,deleteNote,editNote,getAllNote,getSingleNote}}>
            {props.children}
        </notesContext.Provider>
    )
}

export default NoteState;
