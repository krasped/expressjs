import React, {Component} from 'react';

export default class DBPage extends Component{
    constructor(props){
        super(props);
        this.state = {props};
    }

    renderTable(data){ 
        data = JSON.parse(data);
            let res = data.map(function(item,i) {
                return (
                    <p key={item.id}>
                    <span> user id: {item.id}</span>
                    <span> first_name: {item.first_name}</span>
                    <span> last_name: {item.last_name}</span>
                    </p>
                )
            });
        return(
            <div>
                {res}
            </div>
        ) 
    }

    render(){
        let table = (this.props.db!==null) ? this.renderTable(this.props.db) : (<>table</>);
        return (
            <>
                <button onClick={this.props.page}>return to add User page</button>
                <button onClick={this.props.update}>update table</button>
                <div>
                    {table}   
                </div>
            </>
        )
    }
}