import Modal from 'react-modal';
import React, { useState } from 'react';

import DeleteSecionModalComponent from '../delete-section-modal-component/DeleteSectionModalComponent';
import EditionButtonsMenuComponent from '../edition-buttons-menu-component/EditionButtonsMenuComponent';
import HeaderComponent from '../header-component/HeaderComponent';
import SectionsComponent from '../sections-component/SectionsComponent';
import SectionModalComponent from '../section-modal-component/SectionModalComponent';

import { modalCustomStyles } from '../../helpers/constants/modalCustomStyles';
import { modalDeleteSectionCustomStyles } from '../../helpers/constants/modalDeleteSectionCustomStyles';
import { sortArrayOfSectionsByPosition, reorderSectionsAfterEdition, addNewSection, deleteSelectedSection, deleteDocumentsFromSelectedSection } from '../../helpers/functions/functions';

import './EditionComponent.scss';

function EditionComponent({ portalName, sections, documents, setSectionsCallback, setDocumentsCallback }) {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [editSectionMode, setEditSectionMode] = useState(false);
    const [sectionToEdit, setSectionToEdit] = useState({});
    const [modalDeleteSectonIsOpen, setModalDeleteSectonIsOpen] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState({});

    // Logic to create or edit a section

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

    // Logic to delete a section

    const openDeleteSectionModal = (sectionToDelete = {}) => {
        setSectionToDelete(sectionToDelete);
        setModalDeleteSectonIsOpen(true);
    } 
    
    const closeDeleteSectionModal = () => {
        setSectionToDelete({});
        setModalDeleteSectonIsOpen(false);
    }

    const confirmDeleteSection = () => {
        deleteSection();
        setSectionToDelete({});
        setModalDeleteSectonIsOpen(false);
    }

    const deleteSection = () => {

        sections = deleteSelectedSection(sections, sectionToDelete);
        documents = deleteDocumentsFromSelectedSection(documents, sectionToDelete);
                       
        setSectionsCallback([...sections]);
        setDocumentsCallback([...(documents)]);            
        setIsOpen(false);    
    }

    return (
        <div className="main-wrapper">
            <HeaderComponent portalName={portalName}/>
            <h1>Bienvenido/a a la vista de edición de Documentación del {portalName}</h1>
            <EditionButtonsMenuComponent openModalCallback={openModal}/>
            <SectionsComponent sections={sections} documents={documents} editableSections={true} editSectionCallback={openModal} deleteSectionCallback={openDeleteSectionModal}/>
            {/* Modal to create or edit a section */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={modalCustomStyles}
              ariaHideApp={false}
              contentLabel="New/Edit Section Modal">
              <SectionModalComponent
                closeModal={closeModal}
                saveSectionCallBack={saveSection}
                saveDocumentCallback={saveDocument}
                editSectionMode={editSectionMode}
                sectionToEdit={sectionToEdit}
                editSectionCallBack={editSection}
                sectiongsLength={sections.length}/>
            </Modal>
            {/* Modal to delete a section */}
            <Modal
              isOpen={modalDeleteSectonIsOpen}
              onRequestClose={closeDeleteSectionModal}
              style={modalDeleteSectionCustomStyles}
              ariaHideApp={false}
              contentLabel="Delete Section Modal">
              <DeleteSecionModalComponent
                closeDeleteSectionModal={closeDeleteSectionModal}
                confirmDeleteSection={confirmDeleteSection}/>
            </Modal>
        </div>
    );
}

export default EditionComponent;