import React, { useState, useEffect } from 'react';

import SectionModalBottomButtons from '../section-modal-bottom-buttons/SectionModalBottomButtons';
import SectionDocumentsInput from '../section-documents-input/SectionDocumentsInput';
import SectionPositionInput from '../section-position-input/SectionPositionInput';
import SectionModalHeader from '../section-modal-header/SectionModalHeader';
import SectionTextInput from '../section-text-input/SectionTextInput';

import { Document } from '../../models/document';
import { makeId } from '../../helpers/functions/functions'; 
import { Section } from '../../models/section';

import './SectionModalComponent.scss';

function SectionModalComponent({ sectiongsLength, saveSectionCallBack, saveDocumentCallback, closeModal, editSectionMode, sectionToEdit, documentsToEdit, editSectionCallBack, editDocumentCallback}) {

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
            for(let i = 0; i < documentsToEdit.length; i++){
                documentsToEdit[i].key = "document" + (i + 1);
                documentsToEdit[i].uploaded = true;
                documentsToEdit[i].error = false;
            }
            setDocumentsArray([...documentsToEdit]); 
            positionsArray.pop();            
            setPostitionsArray(positionsArray);            
            setPostition(sectionToEdit.position);
        }
        else {
            setPostitionsArray(positionsArray);            
            setPostition(sectiongsLength + 1);
        }
    }, [sectiongsLength, editSectionMode, sectionToEdit, documentsToEdit]);

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
                    createNewDocumentAndSaveCallback(documentsArray[i], newSection.idSection);
                }
            }
            saveSectionCallBack(newSection);
        }
    }

    const createNewDocumentAndSaveCallback = (documentData, parentSectionID) => {
        const newDocument = new Document(
            makeId(),
            documentData.title.trim(),
            'https://www.google.es/', // TO DO
            new Date(),
            new Date(),
            parentSectionID,
            documentData.onlyURL,
            documentData.originalDocumentName
        ); 
        saveDocumentCallback(newDocument);
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
            for(let i = 0; i < documentsArray.length; i++){
                if(documentsArray[i].title.length !== 0){
                    if(documentsArray[i].idDocument !== undefined && documentsArray[i].idDocument !== null){
                        editDocumentCallback(documentsArray[i]);
                    }
                    else {
                        createNewDocumentAndSaveCallback(documentsArray[i], sectionEditted.idSection);
                    }
                }
            } 
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
            (documentsArray[i].error) ? (documentError = true) : (documentError = false);
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
        documentsArray.push({key: "document" + (documentsArray.length + 1), uploaded: false, title: "", error: false, onlyURL: false, originalDocumentName: ""});
        setDocumentsArray([...documentsArray]); 
    }

    const onChangeDocument = (e, eKey) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        documentsArray[positionToChange].uploaded = true;
        documentsArray[positionToChange].title = (e.slice((e.lastIndexOf("\\") + 1), e.length));
        documentsArray[positionToChange].originalDocumentName = (e.slice((e.lastIndexOf("\\") + 1), e.length)).trim();
        documentsArray[positionToChange].error = false;
        if(documentsArray[positionToChange].documentUrl !== undefined && documentsArray[positionToChange].documentUrl !== null){
            documentsArray[positionToChange].documentUrl = 'https://www.google.es/';
        }
        setDocumentsArray([...documentsArray]); 
    }

    const onChangeTitleDocument = (e, eKey) => {
        const positionToChange = Number(eKey.slice(8)) - 1;
        documentsArray[positionToChange].title = e;
        (e.trim().length > 0) ? documentsArray[positionToChange].error = false : documentsArray[positionToChange].error = true;
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

    return (
        <div className="sectionModalWrapper">
            <SectionModalHeader title={editSectionMode ? 'Editar sección' : 'Nueva sección'} closeCallback={closeModal}/>

            <SectionTextInput titleText={"Título"} errorMark={errorTitle} styleValue={"ownInput"} placeHolderText={"Escriba el título de la sección (obligatorio)"} 
                identifier={"titleSection"} valueToShow={titleSection} onChangeCallback={onChangeTitleSection}/>

            <SectionTextInput titleText={"Contenido"} errorMark={errorContent} styleValue={"ownTextarea"} placeHolderText={"Escriba el contenido de la sección (opcional)"} 
                identifier={"contentSection"} valueToShow={contentSection} onChangeCallback={onChangeContentSection} textAreaMode={true} errorLengthSpan={true} maxContentLength={maxContentLength} />

            <SectionPositionInput editSectionMode={editSectionMode } sectionToEdit={sectionToEdit} sectiongsLength={sectiongsLength} positionsArray={positionsArray} setPostitionCallback={setPostition}/>

            <SectionDocumentsInput addDocumentCallback={addDocument} onChangeDocumentCallback={onChangeDocument} 
                onChangeTitleDocumentCallback={onChangeTitleDocument} deleteDocumentCallback={deleteDocument} documentsArray={documentsArray}/>

            <SectionModalBottomButtons cancelText={'Cancelar'} cancelCallback={closeModal} confirmText={'Guardar'} confirmCallback={editSectionMode ? editSection : saveSection}/>
        </div>
    );
}

export default SectionModalComponent;