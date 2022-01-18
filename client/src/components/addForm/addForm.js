import React from 'react';

function AddForm (props) {
    return (
        <>
            <button onClick={props.page}>return to DBPage page</button>
            <div>
                <label>First name</label>
                <input type="text" placeholder='first name'></input>
                <label>Last name</label>
                <input type="text" placeholder='last name'></input>
                <button>Save</button>
            </div>
            
        </>
    )
}
export default AddForm;