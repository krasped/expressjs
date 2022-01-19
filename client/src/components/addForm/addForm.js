import React, { Component } from 'react'

class AddForm extends Component  {
    constructor(props){
        super(props);
        this.props = props;
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeLast = this.handleChangeLast.bind(this);
    }
    state={
        first: null,
        last: null
    };

    handleChangeFirst(event){
        this.setState({
            first: event.target.value
        })
    }

    handleChangeLast(event){
        this.setState({
            last: event.target.value
        })
    }
    
    render(){
        return (
            <>
                <button onClick={this.props.page}>return to DBPage page</button>
                <div>
                    <label>First name</label>
                    <input type="text" placeholder='first name' onChange={this.handleChangeFirst}></input>
                    <label>Last name</label>
                    <input type="text" placeholder='last name' onChange={this.handleChangeLast}></input>
                    <button onClick={() => this.props.saveUser(this.state)}>Save</button>
                </div>
                
            </>
        )
    }
    
}
export default AddForm;