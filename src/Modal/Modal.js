import React from "react";
import  './Modal.css';

export default class Modal extends React.Component{

    state = {
        isOpen: false
    }

    render() {
        return(
            <>
                <button onClick={()=> this.setState({isOpen:true})}>Open Modal</button>
                {this.state.isOpen &&(
                <div className='modal'>
                    <div className='modal-body'>
                        <h1>Hello, I'm modal-window</h1>
                        <p>Author this project: frontend developer Nerovnyy Yan</p>
                        <button onClick={()=> this.setState({isOpen:false})}>close</button>
                    </div>
                </div>)}
            </>
        )
    }
}