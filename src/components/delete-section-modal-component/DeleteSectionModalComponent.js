import React from 'react';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';
import SectionModalHeader from '../section-modal-header/SectionModalHeader';

// We import the SCSS from the section modal component; it is not mandatory to duplicate the same code on different files
import '../section-modal-component/SectionModalComponent.scss';

function DeleteSectionModalComponent({ closeDeleteSectionModal, confirmDeleteSection }) {

    return (
        <div className="sectionModalWrapper">
            <SectionModalHeader title={'Borrar sección'} closeCallback={closeDeleteSectionModal}/>

            <div className="modalText">
                <p className="text">Si borra la sección, se borrarán tambien los documentos o enlaces asociados. ¿Está seguro de que desea borrar la sección?</p>
            </div>

            <div className="bottomWrapper">
                <StyledButtonComponent
                    buttonText={'Cancelar'}
                    clickButton={closeDeleteSectionModal}>
                </StyledButtonComponent>
                <StyledButtonComponent
                    buttonText={'Borrar'}
                    clickButton={confirmDeleteSection}>
                </StyledButtonComponent>
            </div>
        </div>
    );
}

export default DeleteSectionModalComponent;