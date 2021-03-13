import './StyledButtonComponent.scss';
import React from 'react';

function StyledButtonComponent(props) {



    return (
        <div className="buttonWrapper">{props.buttonText}</div>
    );
}

export default StyledButtonComponent;
