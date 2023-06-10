import { Fragment, useContext,useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Badge from 'react-bootstrap/Badge';
import InputField from './Controls/InputField';
import PropTypes from 'prop-types';
import TextAreaField from './Controls/TextAreaField';
import noteContext from '../Context/notesContext';


export default function ShowNote(props) {
    const [open, setOpen] = useState(true);
    const [isChanged,setIsChanged]=useState(false);
    
    const context = useContext(noteContext);
    const {deleteNote,editNote}= context;

    const [note,SetNote]=useState({title:props.selectedNote.title,description:props.selectedNote.description,tag:props.selectedNote.tag})

    const closeHandling = () => {
        setOpen(false);
        props.closeFunc(false);
    }
    
    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
          closeHandling();
        }
    }
    
    
    const handleOnChangeState=(e)=>{
        setIsChanged(true);
        SetNote({...note,[e.target.name]:e.target.value});
    }

    const handlEditClickNote = async () => {
        await editNote(props.selectedNote._id,note.title,note.description,note.tag);
    }


    const handlDeleteClickNote = async () => {
        await deleteNote(props.selectedNote._id);
        props.closeFunc(false);
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden"  onClick={handleOutsideClick}>
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => closeHandling()}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6 flex justify-between">
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                            {note.title}
                                            </Dialog.Title>
                                            <Badge className="mb-2" bg={`${isChanged ? 'secondary':'primary'}`}>{`${isChanged ? 'Draft':'Saved'}`}</Badge>
                                        </div>
                                        {/* ____________________________________________________________________________ */}
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6 d-flex row justify-content-center">
                                                <InputField Title={"Title"} Text={note.title} name={'title'} handleChange={handleOnChangeState} />
                                                <InputField Title={"Tag"} Text={note.tag} name={'tag'} handleChange={handleOnChangeState}/>
                                                <TextAreaField Title={"Description"} name={'description'} Text={note.description} handleChange={handleOnChangeState}/>
                                                <div >

                                                <button onClick={handlEditClickNote} className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                    Edit
                                                </button>
                                                <button onClick={handlDeleteClickNote} className=" flex w-full justify-center rounded-md bg-indigo-600 my-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                    Delete
                                                </button>
                                                </div>
                                            </div>
                                            {/* ____________________________________________________________________________ */}

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
ShowNote.propTypes = {
    selectedNote:PropTypes.object.isRequired
}
