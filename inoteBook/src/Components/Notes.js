import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notesContext';



const Notes = (props) => {
  useEffect(() => {
    props.setSignIn(true);
    console.log("IN");
  });
  const context = useContext(noteContext);
  const { noteState, setNote } = context;
  
  
  return (
    <div>
      <ul role="list" class="divide-y divide-gray-100 py-10">
        {noteState.map((element) => (
          
          <li key={element.id} class="flex justify-between  py-2">
            <div class="flex">
              <div class="min-w-0 flex-auto">
                <h3 class="text-sm font-semibold  text-gray-900">Title : {element.title}</h3>

                <p class="text-sm text-gray-900">Description: {element.description}</p>
              </div>
            </div>
            <div class="hidden sm:flex sm:flex-col sm:items-end">
              <button  type="button" onClick={()=>{console.log(element._id)}} className="rounded-md  mx-10 bg-primary p-2  text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" >
                Show<strong style={{ fontSize: '1.2rem' }}>&rarr;</strong>
              </button>
            </div>
          </li>
          
        ))}
      </ul>

    </div>
  )
}

export default Notes
