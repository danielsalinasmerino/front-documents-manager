// Libraries imports
import './App.scss';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Project Components imports
import SectionComponent from './components/section-component/SectionComponent';
import HeaderComponent from './components/header-component/HeaderComponent';
import StyledButtonComponent from './components/styled-button-component/StyledButtonComponent';
import SectionModalComponent from './components/section-modal-component/SectionModalComponent';

// Other imports
import { initialSections } from './helpers/resources/initialSections';
import { sortArrayOfObjectsByProperty } from './helpers/functions/functions';
import { modalCustomStyles } from './helpers/constants/modalCustomStyles';

// Binding of the Modal to the App element
Modal.setAppElement(document.getElementById('addSection'));

function App() {

  const [sections, setSections] = useState([]);
  useEffect(() => {
    setSections(sortArrayOfObjectsByProperty(initialSections, 'index'))
  }, []);;

  const [modalIsOpen,setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
  }

  function closeModal(){
    setIsOpen(false);
  }

  /* const handleSubmit = (e) => {

    e.preventDefault();
    
    var updatedSections = sections;

    updatedSections.push({ idSection: "8",
      title: title,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
      index: 8}
    );

    setSections([...sortArrayOfObjectsByProperty(updatedSections, 'index')]);
  } */

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
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalCustomStyles}
        ariaHideApp={false}
        contentLabel="Example Modal">
        <SectionModalComponent
          closeModal={closeModal}
          title={'Nueva Sección'}>
        </SectionModalComponent> 
      </Modal>
      
      <h1>Bienvenido/a</h1>

      <h2>Seleccione el tipo de impresos que desea:</h2>

      { 
        sections.map(element => 
          <SectionComponent 
            key={element.idSection} 
            title={element.title} 
            description={element.description}>
          </SectionComponent>
        )
      }
    
    </div>
  );
}

export default App;