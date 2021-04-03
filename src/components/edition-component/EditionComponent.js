import Modal from 'react-modal';
import React, { useState } from 'react';

import EditionButtonsMenuComponent from '../edition-buttons-menu-component/EditionButtonsMenuComponent';
import HeaderComponent from '../header-component/HeaderComponent';
import SectionsComponent from '../sections-component/SectionsComponent';
import SectionModalComponent from '../section-modal-component/SectionModalComponent';

import { modalCustomStyles } from '../../helpers/constants/modalCustomStyles';
import { sortArrayOfSectionsByPosition } from '../../helpers/functions/functions';

import './EditionComponent.scss';

function EditionComponent({ portalName, sections, documents, setSectionsCallback, setDocumentsCallback }) {

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }
    
    const closeModal = () => {
        setIsOpen(false);
    }
    
    const saveSection = (section) => {
    
        const newSectionPosition = section.position;
    
        var updatedSections = sections;
        for(let i = 0; i < updatedSections.length; i++){
          if(newSectionPosition <= updatedSections[i].position){
            updatedSections[i].position = updatedSections[i].position + 1;
          }
        }
        updatedSections.push(section);
    
        setSectionsCallback([...sortArrayOfSectionsByPosition(updatedSections)]);
    
        setIsOpen(false);
    }
    
    const saveDocument = (document) => {
    
        var updatedDocuments = documents;
        updatedDocuments.push(document);
        setDocumentsCallback([...(updatedDocuments)]);
    }

    return (
        <div className="main-wrapper">
            <HeaderComponent portalName={portalName}/>
            <h1>Bienvenido/a a la vista de edición de Documentación del {portalName}</h1>
            <EditionButtonsMenuComponent openModalCallback={openModal}/>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={modalCustomStyles}
              ariaHideApp={false}
              contentLabel="Example Modal">
              <SectionModalComponent
                closeModal={closeModal}
                saveSectionCallBack={saveSection}
                saveDocumentCallback={saveDocument}
                title={'Nueva Sección'}
                sectiongsLength={sections.length}/>
            </Modal>
            <SectionsComponent sections={sections} documents={documents}/>
        </div>
    );
}

export default EditionComponent;
