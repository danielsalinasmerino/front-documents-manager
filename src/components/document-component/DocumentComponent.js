import React from 'react';

import './DocumentComponent.scss';

function DocumentComponent({ documentUrl, title }) {

    return (
        <li>
            <a href={documentUrl}>{title}</a>
        </li> 
    );
}

export default DocumentComponent;
