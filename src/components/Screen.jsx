import React from "react";
import "../styles/screen.css"
export default function Screen(props) {
    let elem = 0;
    if (props.data.type === "iframe") {
        elem = <iframe src={props.data.url}></iframe>;
    } else if (props.data.type === "img"){
        elem = <img src={props.data.url}></img>;
    }
    else{
        elem = <div>No Inquiry</div>
    }
    return <div id="elem-container">{elem}</div>;
}
