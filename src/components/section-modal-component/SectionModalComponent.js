import './SectionModalComponent.scss';
import React, { useState } from 'react';

// Project Components imports
import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

//Import images 
import closeModal from '../../assets/images/close.png'; 

function SectionModalComponent(props) {

    const [titleSection, setTitleSection] = useState("");
    const [errorTitle, setErrorTitle ] = useState(false);

    const [contentSection, setContentSection] = useState("");
    
    const [titleDocument, setTitleDocument] = useState("");

    function saveSection(){
    
        const titleSectionTrim = titleSection.trim();

        if(titleSectionTrim.length === 0){
            setErrorTitle(true);
        }
        else {

            const contentSectionTrim = contentSection.trim();

            const newSection = { idSection: "8",
                    title: titleSectionTrim,
                    description: contentSectionTrim,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    index: 8
            }

            props.saveSection(newSection);
        }
    }

    function onChangeTitleSection(e){
        setTitleSection(e.target.value);
        setErrorTitle(false);
    }

    return (
        <div className="sectionModalWrapper">
            <div className="modalHeader">
                <p className="titleHeader">Nueva sección</p>
                <img className="closeModal" src={closeModal} alt="Close Modal" onClick={props.closeModal}/>
            </div>
            <div className="inputWrapper">
                <p className="inputTitle">Título</p>
                <input
                    className={errorTitle ? "ownInput error" : "ownInput"}
                    placeholder="Escriba el título de la sección (obligatorio)"
                    type="text"
                    id="titleSection"
                    value={titleSection}
                    onChange={(e) => onChangeTitleSection(e)}/>
            </div>
            <div className="inputWrapper">
                <p className="inputTitle">Contenido</p>
                <textarea
                    className="ownTextarea"
                    placeholder="Escriba el contenido de la sección (opcional)"
                    type="text"
                    id="contentSection"
                    value={contentSection}
                    onChange={(e) => setContentSection(e.target.value)}/>
            </div>
            <div className="inputWrapper">
                <p className="inputTitle">Documentos</p>
                <input 
                    className="ownInput"
                    type="file" 
                    id="file" 
                    name="myfile"/>
                <input
                    className="ownInput"
                    placeholder="Escriba el título del documento (obligatorio)"
                    type="text"
                    id="titleDocument"
                    value={titleDocument}
                    onChange={(e) => setTitleDocument(e.target.value)}/>
            </div>
            <div className="bottomWrapper">
                <StyledButtonComponent
                    buttonText={'Guardar'}
                    clickButton={saveSection}>
                </StyledButtonComponent>
            </div>
        </div>
    );
}

export default SectionModalComponent;
