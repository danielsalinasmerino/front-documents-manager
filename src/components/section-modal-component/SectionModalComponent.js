import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import closeModalImageRoute from '../../assets/images/close.png';
import { Document } from '../../models/document';
import { makeId } from '../../helpers/functions/functions'; 
import { Section } from '../../models/section';

import './SectionModalComponent.scss';

function SectionModalComponent({ sectiongsLength, saveSectionCallBack, saveDocumentCallback,  closeModal}) {

    const [titleSection, setTitleSection] = useState("");
    const [errorTitle, setErrorTitle] = useState(false);

    const [contentSection, setContentSection] = useState("");

    const [positionsArray, setPostitionsArray] = useState([]);
    const [position, setPostition] = useState(sectiongsLength + 1);

    const [documentUploaded, setDocumentUploaded] = useState(false);
    const [titleDocument, setTitleDocument] = useState("");
    const [errorTitleDocument, setErrorTitleDocument] = useState(false);

    useEffect(() => {

        // We create the options for the positions
        var positionsArray = [];
        for(let i = 1; i < (sectiongsLength + 2); i++){
            positionsArray.push({value: i, label: i.toString()});
        }
        setPostitionsArray(positionsArray);

    }, []);

    function saveSection(){
    
        // First we check the posible errors
        const titleSectionError = checkTitleSectionErrors();
        const documentError = checkDocumentErrors();

        if(titleSectionError || documentError){
            // If we find errors we let the user know them
            (titleSectionError && setErrorTitle(true));
            (documentError && setErrorTitleDocument(true));
        }
        else {
            // If we do not find errors we save the section
            const newSection = new Section(
                makeId(),
                titleSection.trim(),
                contentSection.trim(),
                new Date(),
                new Date(),
                position,
                null, // To do (parentID)
                null  // To do (portalID)
            );

            if(documentUploaded){
                // If we find errors we save the section
                const newDocument = new Document(
                    makeId(),
                    titleDocument.trim(),
                    'https://www.google.es/',
                    new Date(),
                    new Date(),
                    newSection.idSection
                ); 

                saveDocumentCallback(newDocument)
            }

            saveSectionCallBack(newSection);
        }
    }

    const checkTitleSectionErrors = () => {
        const titleSectionTrim = titleSection.trim();
        return (titleSectionTrim.length === 0);
    }

    const checkDocumentErrors = () => {
        var documentError = false;
        if(documentUploaded){
            const titleDocumentTrim = titleDocument.trim();
            documentError = (titleDocumentTrim.length === 0);
        }
        return documentError;
    }

    function onChangeTitleSection(e){
        setTitleSection(e.target.value);
        setErrorTitle(false);
    }

    function onChangeDocument(e){
        setDocumentUploaded(true);
        setTitleDocument(((e.slice((e.lastIndexOf("\\") + 1), e.length)).trim()));
    }

    function onChangeTitleDocument(e){
        setTitleDocument(e);
        setErrorTitleDocument(false);
    }

    return (
        <div className="sectionModalWrapper">
            <div className="modalHeader">
                <p className="titleHeader">Nueva sección</p>
                <img className="closeModal" src={closeModalImageRoute} alt="Close Modal" onClick={closeModal}/>
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
                <p className="inputTitle">Posición</p>
                <div className="ownSelector">
                    <Select 
                        defaultValue={{value: (sectiongsLength + 1), label: (sectiongsLength + 1).toString()}}
                        placeholder="Escoja la posición de la sección (obligatorio)"
                        options={positionsArray} 
                        onChange={(e) => setPostition(e.value)}/>
                </div>
            </div>
            <div className="inputWrapper">
                <p className="inputTitle">Documentos</p>
                <input 
                    className="ownInput ownInputFile"
                    type="file" 
                    id="file" 
                    name="myfile"
                    onChange={(e) => onChangeDocument(e.target.value)}/>
                { documentUploaded && <input
                    className={errorTitleDocument ? "ownInput error" : "ownInput"}
                    placeholder="Escriba el título del documento"
                    type="text"
                    id="titleDocument"
                    value={titleDocument}
                    onChange={(e) => onChangeTitleDocument(e.target.value)}/> } 
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
