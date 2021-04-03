import React from 'react';

import HeaderComponent from '../header-component/HeaderComponent';
import SectionsComponent from '../sections-component/SectionsComponent';

import './PreviewComponent.scss';

function PreviewComponent({ portalName, sections, documents }) {



    return (
        <div className="main-wrapper">

            <HeaderComponent portalName={portalName}/>

            <h1>Bienvenido/a</h1>

            <h2>Seleccione el tipo de impresos que desea:</h2>

            <SectionsComponent sections={sections} documents={documents}/>

        </div>
    );
}

export default PreviewComponent;
