import React, { Component } from 'react'

class AddForm extends Component  {
    constructor(props){
        super(props);
        this.props = props;
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeLast = this.handleChangeLast.bind(this);
    }
    state={
        first: "",
        last: ""
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

    clearInput(){
        this.setState({
            first: "",
            last: ""
        })
    }
    
    render(){
        const DB = "DB";
        const book = "book";
        return (
            <>
                <button onClick={() => this.props.page(DB)}>return to DBPage page</button>
                <button onClick={() => this.props.page(book)}>return to book page</button>
                <div>
                    <label>First name</label>
                    <input type="text" 
                        placeholder='first name' 
                        onChange={this.handleChangeFirst}
                        value={this.state.first}></input>
                    <label>Last name</label>
                    <input type="text" 
                        placeholder='last name' 
                        onChange={this.handleChangeLast}
                        value={this.state.last}></input>
                    <button onClick={() => {this.props.saveUser(this.state); this.clearInput()}}>Save</button>
                </div>
                
            </>
        )
    }
    
}
export default AddForm;