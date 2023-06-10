import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';
export default function TextAreaField(props) {
    return (
      
        // <InputGroup size="sm" className="mb-3">
        //     <InputGroup.Text id="inputGroup-sizing-sm">{props.Title}</InputGroup.Text>
        //     <Form.Control
        //     aria-label="Small"
        //     value={props.Text}
        //     aria-describedby="inputGroup-sizing-sm"
        //     />
        // </InputGroup>
        <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {props.Title}
              </label>
              <div className="mt-2">
              <textarea
               id={props.name}  
               name={props.name} 
               defaultValue={props.Text}
               onChange={props.handleChange} 
               type="text"  
              className="px-4 block w-full rounded-md border-2 py-1.5 my-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

            </div>  
        </div>  
    )
  }
  TextAreaField.propTypes = {
    ID: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
}
