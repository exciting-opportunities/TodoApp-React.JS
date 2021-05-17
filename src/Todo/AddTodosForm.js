import React, {useState} from "react";
import PropTypes from 'prop-types'


function useInputValue(defaultValue = ''){
    const [value,setValue] = useState(defaultValue)

    return{
        bind:{value,
            onInput: event=> setValue(event.target.value)
        },
        clear: ()=>setValue(''),
        }

}

function AddTodosForm({add}){
    const input = useInputValue('');
    // const [value,setValue] = useState("");

    // function submitHandler(event){
    //     event.preventDefault();
    //
    //     if(value.trim()){
    //         add(value);
    //         setValue('');
    //     }
    // }
    function submitHandler(event){
        event.preventDefault();

        if(input.bind.value.trim()){
            add(input.bind.value);
            input.clear();
        }
     }
    return(
        <form style={{marginBottom:'1rem'}} onSubmit={submitHandler}>
            <input {...input.bind} />
            <button type='submit'>Добавить</button>
        </form>
    )

}
AddTodosForm.propTypes = {
    add: PropTypes.func.isRequired
}

export default AddTodosForm
