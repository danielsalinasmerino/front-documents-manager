import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import closeModalImageRoute from '../../assets/images/close.png';
import { Document } from '../../models/document';
import { makeId } from '../../helpers/functions/functions'; 
import { Section } from '../../models/section';

import './SectionModalComponent.scss';

function SectionModalComponent({ sectiongsLength, saveSectionCallBack, saveDocumentCallback, closeModal, editSectionMode, sectionToEdit, editSectionCallBack}) {

    const [titleSection, setTitleSection] = useState("");
    const [errorTitle, setErrorTitle] = useState(false);

    const [contentSection, setContentSection] = useState("");
    const [errorContent, setErrorContent] = useState(false);
    const maxContentLength = "4000";

    const [positionsArray, setPostitionsArray] = useState([]);
    const [position, setPostition] = useState(0);

    const [documentUploaded, setDocumentUploaded] = useState(false);
    const [titleDocument, setTitleDocument] = useState("");
    const [errorTitleDocument, setErrorTitleDocument] = useState(false);

    useEffect(() => {

        var positionsArray = [];
        
        const sectiongsLengthHelper = sectiongsLength + 2;
        for(let i = 1; i < sectiongsLengthHelper; i++){            
            positionsArray.push({value: i, label: i.toString()});        
        }

        if(editSectionMode){
            setTitleSection(sectionToEdit.title);
            setContentSection(sectionToEdit.description);
            
            positionsArray.pop();            
            setPostitionsArray(positionsArray);            
            setPostition(sectionToEdit.position);
        }
        else {
            setPostitionsArray(positionsArray);            
            setPostition(sectiongsLength + 1);
        }
    }, [sectiongsLength, editSectionMode, sectionToEdit]);

    const saveSection = () => {
    
        // First we check the posible errors
        const titleSectionError = checkTitleSectionErrors();
        const documentError = checkDocumentErrors();

        if(titleSectionError || documentError || errorContent){
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

                saveDocumentCallback(newDocument);
            }

            saveSectionCallBack(newSection);
        }
    }

    const editSection = () => {            
        
        // First we check the posible errors        
        const titleSectionError = checkTitleSectionErrors();        
        const documentError = checkDocumentErrors();
                
        if(titleSectionError || documentError || errorContent){            
            // If we find errors we let the user know them            
            (titleSectionError && setErrorTitle(true));        
        }        
        else {            
            // If we do not find errors we save the section            
            var sectionEditted = sectionToEdit;            
            sectionEditted.title = titleSection;            
            sectionEditted.description = contentSection;
            sectionEditted.oldPosition = sectionEditted.position;         
            sectionEditted.position = position;
                    
            editSectionCallBack(sectionEditted);        
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

    const onChangeTitleSection = (e) => {
        setTitleSection(e.target.value);
        setErrorTitle(false);
    }

    const onChangeContentSection = (e) => {
        setContentSection(e.target.value);
        (e.target.value.length > maxContentLength) ? setErrorContent(true) : setErrorContent(false);
    }

    const onChangeDocument = (e) => {
        setDocumentUploaded(true);
        setTitleDocument(((e.slice((e.lastIndexOf("\\") + 1), e.length)).trim()));
    }

    const onChangeTitleDocument = (e) => {
        setTitleDocument(e);
        setErrorTitleDocument(false);
    }

    return (
        <div className="sectionModalWrapper">
            <div className="modalHeader">
                <p className="titleHeader">{editSectionMode ? 'Editar sección' : 'Nueva sección'}</p>
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
                    className={errorContent ? "ownTextarea error" : "ownTextarea"}
                    placeholder="Escriba el contenido de la sección (opcional)"
                    type="text"
                    id="contentSection"
                    value={contentSection}
                    onChange={(e) => onChangeContentSection(e)}/>
                <span className={errorContent ? "contentLength errorContentLength" : "contentLength"}>{contentSection.length}/{maxContentLength}</span>
            </div>
            <div className="inputWrapper">
                <p className="inputTitle">Posición</p>
                <div className="ownSelector">
                    <Select 
                        defaultValue={editSectionMode ?                             
                            {value: sectionToEdit.position, label: (sectionToEdit.position).toString()} :                             
                            {value: (sectiongsLength + 1), label: (sectiongsLength + 1).toString()}}
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
                    buttonText={'Cancelar'}
                    clickButton={closeModal}>
                </StyledButtonComponent>
                <StyledButtonComponent
                    buttonText={'Guardar'}
                    clickButton={editSectionMode ? editSection : saveSection}>
                </StyledButtonComponent>
            </div>
        </div>
    );
}

export default SectionModalComponent;
