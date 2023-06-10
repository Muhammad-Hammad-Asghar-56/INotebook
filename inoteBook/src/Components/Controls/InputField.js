import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function InputField(props) {
    return (
        <div>
              <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                {props.Title}
              </label>
              <div className="mt-2">
                <input id={props.name}  
                name={props.name} 
                defaultValue={props.Text}
                onChange={props.handleChange} 
                type="text" 
                required 
                className=" px-4 block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div> 
            { !props.Text &&
              <label htmlFor="text" className="block text-sm font-medium leading-6 text-red-900">
                {props.Title} cannot be empty
              </label>}
        </div>  
    )
  }
  