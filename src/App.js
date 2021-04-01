
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';

import HeaderComponent from './components/header-component/HeaderComponent';
import SectionComponent from './components/section-component/SectionComponent';
import SectionModalComponent from './components/section-modal-component/SectionModalComponent';
import StyledButtonComponent from './components/styled-button-component/StyledButtonComponent';

import { initialSections } from './helpers/resources/initialSections';
import { initialDocuments } from './helpers/resources/initialDocuments';
import { modalCustomStyles } from './helpers/constants/modalCustomStyles';
import { sortArrayOfSectionsByPosition } from './helpers/functions/functions';

import './App.scss';

Modal.setAppElement(document.getElementById('addSection'));

function App() {

  const [sections, setSections] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSections(sortArrayOfSectionsByPosition(initialSections));
    setDocuments(initialDocuments);
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function saveSection(section){

    const newSectionPosition = section.position;

    var updatedSections = sections;
    for(let i = 0; i < updatedSections.length; i++){
      if(newSectionPosition <= updatedSections[i].position){
        updatedSections[i].position = updatedSections[i].position + 1;
      }
    }
    updatedSections.push(section);

    setSections([...sortArrayOfSectionsByPosition(updatedSections)]);

    setIsOpen(false);
  }

  const saveDocument = (document) => {

    var updatedDocuments = documents;
    updatedDocuments.push(document);
    setDocuments([...(updatedDocuments)]);
}

  function getSectionDocuments(idSection){
    return documents.filter(document => { return document.sectionID === idSection });
  }

  return (
    <div className="main-wrapper">

      <HeaderComponent
        section={'PAS'}>
      </HeaderComponent>

      <div className="buttonsMenu">
        <StyledButtonComponent
          id="addSection"
          clickButton={openModal}
          buttonText={'Añadir Sección'}>
        </StyledButtonComponent>
        <StyledButtonComponent
            buttonText={'Vista Previa'}>
        </StyledButtonComponent>
        <StyledButtonComponent
            buttonText={'Guardar Cambios'}>
        </StyledButtonComponent>
      </div>

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
          sectiongsLength={sections.length}>
        </SectionModalComponent> 
      </Modal>
      
      <h1>Bienvenido/a</h1>

      <h2>Seleccione el tipo de impresos que desea:</h2>

      { 
        sections.map(element => 
          <SectionComponent 
            key={element.idSection} 
            title={element.title} 
            description={element.description}
            documents={getSectionDocuments(element.idSection)}>
          </SectionComponent>
        )
      }
    
    </div>
  );
}

export default App;