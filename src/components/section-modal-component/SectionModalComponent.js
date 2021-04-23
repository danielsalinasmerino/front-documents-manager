import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import StyledButtonComponent from '../styled-button-component/StyledButtonComponent';

import addImageRoute from '../../assets/images/section-options/add.png';
import closeModalImageRoute from '../../assets/images/close.png';
import deleteImageRoute from '../../assets/images/section-options/delete.png';
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

    const [documentsArray, setDocumentsArray] = useState([]);

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

            for(let i = 0; i < documentsArray.length; i++){
                if(documentsArray[i].title.length !== 0){
                    const newDocument = new Document(
                        makeId(),
                        documentsArray[i].title.trim(),
                        'https://www.google.es/', // TO DO
                        new Date(),
                        new Date(),
                        newSection.idSection
                    ); 
    
                    saveDocumentCallback(newDocument);
                }
            }

            saveSectionCallBack(newSection);
        }
    }

    const editSection = () => {            
        
        // First we check the posible errors        
        const titleSectionError = checkTitleSectionErrors();        
        const documentError = checkDocumentErrors();
                
        if(titleSectionError || documentError || errorContent){            
            // If we find errors on the title we let the user know them            
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
        for(let i = 0; i < documentsArray.length; i++){
            if(documentsArray[i].error){
                documentError = true;
            }
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

    const addDocument = () => {
        documentsArray.push({key: "document" + (documentsArray.length + 1), uploaded: false, title: "", error: false});
        setDocumentsArray([...documentsArray]); 
    }

    const deleteDocument = (eKey) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        documentsArray.splice(positionToChange, 1);
        for(let i = 0; i < documentsArray.length; i++){
            documentsArray[i].key = "document" + (i + 1);
        }
        setDocumentsArray([...documentsArray]); 
    }

    const onChangeDocument = (e, eKey) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        documentsArray[positionToChange].uploaded = true;
        documentsArray[positionToChange].title = (e.slice((e.lastIndexOf("\\") + 1), e.length)).trim();
        documentsArray[positionToChange].error = false;
        setDocumentsArray([...documentsArray]); 
    }

    const onChangeTitleDocument = (e, eKey) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        documentsArray[positionToChange].title = e.trim();
        (e.trim().length > 0) ? documentsArray[positionToChange].error = false : documentsArray[positionToChange].error = true;
        setDocumentsArray([...documentsArray]); 
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
                <p className="inputTitle">A continuación puede añadir documentos o enlaces</p>
                <div className="inputLine">
                    <p className="inputSubTitle">Documentos</p>
                    <img className="optionDocumentImage smallMarginTop" onClick={addDocument} src={addImageRoute} alt={"Añadir documento"}/>
                </div>
                { 
                    documentsArray.map(element => 
                        <div key={element.key} className="fullWidth">
                            <div className="inputLine">
                            <input 
                                className="ownInput ownInputFile marginTop smallFontSize "
                                type="file" 
                                id="file" 
                                name="myfile"
                                onChange={(e) => onChangeDocument(e.target.value, element.key)}/>
                                <img className="optionDocumentImage" onClick={() => deleteDocument(element.key)} src={deleteImageRoute} alt={"Borrar documento"}/>
                            </div>
                                { element.uploaded && 
                                <div className="inputLine">
                                    <p className="lineText">El nombre del documento que se mostrará será:</p>
                                    <input
                                        className={element.error ? "ownInput ownInputHalf error smallFontSize" : "ownInput ownInputHalf smallFontSize"}
                                        placeholder="Escriba el nombre del documento"
                                        type="text"
                                        id="titleDocument"
                                        value={element.title}
                                        onChange={(e) => onChangeTitleDocument(e.target.value, element.key)}/>
                                </div> }
                        </div>
                    )
                }
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