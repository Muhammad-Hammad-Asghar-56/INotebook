import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../Context/notesContext';
import Navbar from './Navbar';
import ShowNoteTemp from './ShowNotes'
import MessageDiv from './MessageDiv';
import { Badge } from 'react-bootstrap';



const Notes = (props) => {
  const [open, SetOpen] = useState(false);
  const context = useContext(noteContext);
  const { noteState, getSingleNote,getAllNote } = context;

  useEffect(() => {
    // eslint-disable-next-line
    // props.setSignIn(true);
    getAllNote(); 
  }, []);

  const [selectedElement, SetSelectedElement] = useState(null);

  const handleShowNoteBtn = async(id) => {
    const data=await getSingleNote(id);
    SetSelectedElement(data[0]);
    SetOpen(true);  
  };

  return (
    <>
    <Navbar />
    {noteState.length && <div className="mx-4">
      <ul role="list" className="divide-y divide-gray-100 py-10 mt-10">
        {noteState.map((element) => (
          <li key={element._id} className="flex flex-col sm:flex-row justify-between py-2">
            <div className="flex">
              <div className="min-w-0 flex-auto">
                <h5 className="font-bold text-gray-900">{element.title}</h5>
                <div>
                  <span className="text-sm font-semibold text-gray-900">Tag</span>
                  <Badge className='mx-2' bg="secondary">{element.tag}</Badge>
                </div>
                <span className="font-semibold text-sm text-gray-900">Description: </span>
                <span className="text-sm text-gray-900">{element.description.slice(0,80)} {element.description.length>80? <span style={{color:"blue"}}>... to continue</span>:""}</span>
              </div>
            </div>
            <div className="mt-2 sm:mt-0">
              <button
                onClick={(e) => {
                  handleShowNoteBtn(element._id);
                }}
                className="rounded-md bg-primary p-2 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Show <strong style={{ fontSize: '1.2rem' }}>&rarr;</strong>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {open && selectedElement && <ShowNoteTemp selectedNote={selectedElement} closeFunc={() => SetOpen(false)} />}
    </div>}
    

    {!noteState.length && <MessageDiv pageTitle={"OOPs! No Note has been found"} pageDesc={"Add some Notes to the cloud"}/>}
    </>
  );
};

export default Notes;
