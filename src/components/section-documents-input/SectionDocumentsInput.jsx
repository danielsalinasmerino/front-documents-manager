import React from 'react';

import addImageRoute from '../../assets/images/section-options/add.png';
import deleteImageRoute from '../../assets/images/section-options/delete.png';


function SectionDocumentsInput({ addDocumentCallback, onChangeDocumentCallback, onChangeTitleDocumentCallback, deleteDocumentCallback, documentsArray }) {

    

    return (
        <div className="inputWrapper">
            <p className="inputTitle">A continuación puede añadir documentos o enlaces</p>
            <div className="inputLine">
                <p className="inputSubTitle">Documentos</p>
                <img className="optionDocumentImage smallMarginTop" onClick={addDocumentCallback} src={addImageRoute} alt={"Añadir documento"}/>
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
                            onChange={(e) => onChangeDocumentCallback(e.target.value, element.key)}/>
                            <img className="optionDocumentImage" onClick={() => deleteDocumentCallback(element.key)} src={deleteImageRoute} alt={"Borrar documento"}/>
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
                                    onChange={(e) => onChangeTitleDocumentCallback(e.target.value, element.key)}/>
                            </div> }
                    </div>
                )
            }
        </div>
    );
}

export default SectionDocumentsInput;