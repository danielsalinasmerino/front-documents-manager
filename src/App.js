
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';

import HeaderComponent from './components/header-component/HeaderComponent';
import SectionsComponent from './components//sections-component/SectionsComponent';
import SectionModalComponent from './components/section-modal-component/SectionModalComponent';
import StyledButtonComponent from './components/styled-button-component/StyledButtonComponent';

import { initialSections } from './helpers/resources/initialSections';
import { initialDocuments } from './helpers/resources/initialDocuments';
import { modalCustomStyles } from './helpers/constants/modalCustomStyles';
import { sortArrayOfSectionsByPosition } from './helpers/functions/functions';

import './App.scss';

Modal.setAppElement(document.getElementById('addSection'));

function App() {

  const portalName = 'PAS';

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

  return (
    <Router>
      <Switch>
        <Route path="/preview">
          <div className="main-wrapper">

            <HeaderComponent portalName={portalName}/>

            <h1>Bienvenido/a</h1>

            <h2>Seleccione el tipo de impresos que desea:</h2>

            <SectionsComponent sections={sections} documents={documents}/>

          </div>
        </Route>
        <Route path="/">
          <div className="main-wrapper">

            <HeaderComponent portalName={portalName} />

            <h1>Bienvenido/a a la vista de edición de Documentación del {portalName}</h1>

            <div className="buttonsMenu">
              <StyledButtonComponent id="addSection" clickButton={openModal} buttonText={'Añadir Sección'}/>
              <Link to="/preview" target="_blank">
                <StyledButtonComponent buttonText={'Vista Previa'} />
              </Link>
              <StyledButtonComponent buttonText={'Guardar Cambios'} />
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
                sectiongsLength={sections.length}/>
            </Modal>

            <SectionsComponent sections={sections} documents={documents}/>

          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;