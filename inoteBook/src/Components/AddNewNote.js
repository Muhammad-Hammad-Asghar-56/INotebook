import {useContext, useState } from 'react'
import InputField from './Controls/InputField';
import noteContext from '../Context/notesContext';
import TextAreaField from './Controls/TextAreaField';
import SliderSidePanel from './Controls/SliderSidePanel';

export default function AddNewNote(props) {
    const [open, setOpen] = useState(true);
    const context = useContext(noteContext);
    
    const [note,SetNote]=useState({title:'',description:'',tag:''})
    
    const {addNewNote}= context;

    const handleOnChangeState=(e)=>{
        SetNote({...note,[e.target.name]:e.target.value});
    }

    const closeHandling = () => {
        setOpen(false);
        props.closeFunc(false);
    }

    const handlAddClickNote = () => {
        
        addNewNote(note.title,note.tag,note.description);
        setOpen(false);
    }
    return (
        <SliderSidePanel open={open} onClose={closeHandling}>
            <div className="relative mt-6 flex-1 px-4 sm:px-6 d-flex row justify-content-center">
            <InputField Title={"Title"} name={"title"} Text={note.title}  handleChange={handleOnChangeState} />
            <InputField Title={"Tag"} name={"tag"} Text={note.tag} handleChange={handleOnChangeState}/>
            <TextAreaField Title={"Description"} name={"description"} Text={note.description} handleChange={handleOnChangeState}/>
            <div >
            <button onClick={() => (handlAddClickNote())} className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Save
            </button>
            </div>
            </div>
        </SliderSidePanel>
    )
}