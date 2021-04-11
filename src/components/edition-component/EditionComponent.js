import Modal from 'react-modal';
import React, { useState } from 'react';

import EditionButtonsMenuComponent from '../edition-buttons-menu-component/EditionButtonsMenuComponent';
import HeaderComponent from '../header-component/HeaderComponent';
import SectionsComponent from '../sections-component/SectionsComponent';
import SectionModalComponent from '../section-modal-component/SectionModalComponent';

import { modalCustomStyles } from '../../helpers/constants/modalCustomStyles';
import { sortArrayOfSectionsByPosition, reorderSectionsAfterEdition, addNewSection, deleteSelectedSection } from '../../helpers/functions/functions';

import './EditionComponent.scss';

function EditionComponent({ portalName, sections, documents, setSectionsCallback, setDocumentsCallback }) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [editSectionMode, setEditSectionMode] = useState(false);
    const [sectionToEdit, setSectionToEdit] = useState({});

    const openModal = (sectionToEdit = {}) => {
        if(sectionToEdit !== {} && sectionToEdit.title){
            setSectionToEdit(sectionToEdit);
            setEditSectionMode(true);
        }
        setIsOpen(true);
    }
    
    const closeModal = () => {
        setSectionToEdit({});
        setEditSectionMode(false);
        setIsOpen(false);
    }
    
    const saveSection = (section) => {
    
        sections = addNewSection(sections, section);
    
        setSectionsCallback([...sortArrayOfSectionsByPosition(sections)]);
        setIsOpen(false);
    }

    const saveDocument = (document) => {

        documents.push(document);

        setDocumentsCallback([...(documents)]);
    }

    const editSection = (section) => {           

        const newPositionEdittedSection = section.position; 
        const oldPositionEdittedSection = section.oldPosition;
        delete section.oldPosition;

        sections = reorderSectionsAfterEdition(sections, oldPositionEdittedSection, newPositionEdittedSection);
        sections[newPositionEdittedSection - 1] = section;
                   
        setSectionsCallback([...sections]);            
        setIsOpen(false);    
    }

    const deleteSection = (section) => {

        sections = deleteSelectedSection(sections, section);
                       
        setSectionsCallback([...sections]);            
        setIsOpen(false);    
    }

    return (
        <div className="main-wrapper">
            <HeaderComponent portalName={portalName}/>
            <h1>Bienvenido/a a la vista de edición de Documentación del {portalName}</h1>
            <EditionButtonsMenuComponent openModalCallback={openModal}/>
            <SectionsComponent sections={sections} documents={documents} editableSections={true} editSectionCallback={openModal} deleteSectionCallback={deleteSection}/>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={modalCustomStyles}
              ariaHideApp={false}
              contentLabel="New Section Modal">
              <SectionModalComponent
                closeModal={closeModal}
                saveSectionCallBack={saveSection}
                saveDocumentCallback={saveDocument}
                editSectionMode={editSectionMode}
                sectionToEdit={sectionToEdit}
                editSectionCallBack={editSection}
                sectiongsLength={sections.length}/>
            </Modal>
        </div>
    );
}

export default EditionComponent;