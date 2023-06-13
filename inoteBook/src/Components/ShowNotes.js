import {  useContext,useState } from 'react'
import Badge from 'react-bootstrap/Badge';
import InputField from './Controls/InputField';
import PropTypes from 'prop-types';
import TextAreaField from './Controls/TextAreaField';
import noteContext from '../Context/notesContext';
import SliderSidePanel from './Controls/SliderSidePanel';



export default function ShowNote(props) {
  const [open, setOpen] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [note, setNote] = useState({
    title: props.selectedNote.title,
    description: props.selectedNote.description,
    tag: props.selectedNote.tag
  });

  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;

  const closeHandling = () => {
    setOpen(false);
    props.closeFunc(false);
  }

  

  const handleOnChangeState = (e) => {
    setIsChanged(true);
    setNote((prevNote) => ({ ...prevNote, [e.target.name]:e.target.value }));
  }

  const handleEditClickNote = async () => {
    console.log(note);
    await editNote(props.selectedNote._id, note.title, note.tag, note.description);
  }

  const handleDeleteClickNote = async () => {
    await deleteNote(props.selectedNote._id);
    props.closeFunc(false);
  }

  return (
    <SliderSidePanel open={open} onClose={closeHandling}>
      {/* ____________________________________________________________________________ */}
      <div className="relative mt-6 flex-1 px-4 sm:px-6 d-flex row justify-content-center">
        <div className='container sm:px-6'>
            <h1 className='text-base font-semibold leading-6 text-gray-900'>Title</h1>
            <Badge className='my-2' bg={isChanged ? "secondary":"primary"}>{isChanged ? "Draft":"Saved"}</Badge>
        </div>
        <InputField Title={"Title"} Text={note.title} name={'title'} handleChange={handleOnChangeState} />
        <InputField Title={"Tag"} Text={note.tag} name={'tag'} handleChange={handleOnChangeState}/>
        <TextAreaField Title={"Description"} name={'description'} Text={note.description} handleChange={handleOnChangeState}/>
        <div >

        <button onClick={handleEditClickNote} className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Edit
        </button>
        <button onClick={handleDeleteClickNote} className=" flex w-full justify-center rounded-md bg-indigo-600 my-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Delete
        </button>
        </div>
    </div>
    {/* ____________________________________________________________________________ */}

    </SliderSidePanel>
  )
}

ShowNote.propTypes = {
  selectedNote: PropTypes.object.isRequired,
  closeFunc: PropTypes.func.isRequired
}
