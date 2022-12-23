import React from 'react';
import "../styles/button.css"
export default function Button(props){
    return (
        <div id="btn-container">
            <div id={props.id} class="btn" onClick={props.handleClick}>
                {props.text}
            </div>
        </div>
    );
}