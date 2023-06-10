import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../Context/notesContext';
import ShowNote from './ShowNote';

const Notes = (props) => {
  const [open, SetOpen] = useState(false);
  const context = useContext(noteContext);
  const { noteState, getSingleNote,getAllNote } = context;

  useEffect(() => {
    props.setSignIn(true);
    getAllNote();
  }, []);

  const [selectedElement, SetSelectedElement] = useState(null);

  const handleShowNoteBtn = async(id) => {
    const data=await getSingleNote(id);
    console.log(data);

    SetSelectedElement(data[0]);
    SetOpen(true);  
  };

  return (
    <div className="mx-4">
      <ul role="list" className="divide-y divide-gray-100 py-10 mt-10">
        {noteState.map((element) => (
          <li key={element._id} className="flex flex-col sm:flex-row justify-between py-2">
            <div className="flex">
              <div className="min-w-0 flex-auto">
                <h3 className="text-sm font-semibold text-gray-900">Title: {element.title}</h3>
                <p className="text-sm text-gray-900">Description: {element.description}</p>
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
      {open && selectedElement && <ShowNote selectedNote={selectedElement} closeFunc={() => SetOpen(false)} />}
    </div>
  );
};

export default Notes;
