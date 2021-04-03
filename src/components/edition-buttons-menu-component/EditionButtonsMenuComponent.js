import { Link } from "react-router-dom";
import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import './EditionButtonsMenuComponent.scss';

function EditionButtonsMenuComponent({ openModalCallback }) {

    return (
        <div className="buttonsMenu editionView">
            <StyledButtonComponent clickButton={openModalCallback} buttonText={'Añadir Sección'}/>
            <Link className="link-clean" to="/preview">
                <StyledButtonComponent buttonText={'Vista Previa'}/>
            </Link>
            <StyledButtonComponent buttonText={'Guardar Cambios'}/>
        </div>
    );
}

export default EditionButtonsMenuComponent;
