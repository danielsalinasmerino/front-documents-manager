import React from 'react';

import './DocumentComponent.scss';

function DocumentComponent({ key, documentUrl, title }) {

    return (
        <li key={key} >
            <a href={documentUrl}>{title}</a>
        </li> 
    );
}

export default DocumentComponent;
