import './SectionModalComponent.scss';
import React, { useState } from 'react';

//Import images 
import closeModal from '../../assets/images/close.png'; 

function SectionModalComponent(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="sectionModalWrapper">
            <div className="modalHeader">
                <p className="titleHeader">{props.title}</p>
                <img className="closeModal" src={closeModal} alt="Close Modal" onClick={props.closeModal}/>
            </div>
            <div className="inputWrapper">
                <p className="inputTitle">Título</p>
                <input
                    className="ownInput"
                    placeholder="Escriba el título de la sección (obligatorio)"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="inputWrapper">
                <p className="inputTitle">Contenido</p>
                <textarea
                    className="ownTextarea"
                    placeholder="Escriba el contenido de la sección (opcional)"
                    type="text"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}/>
            </div>
            <div className="inputWrapper">
                <p className="inputTitle">Documentos</p>
                {/* <textarea
                    className="ownTextarea"
                    placeholder="Escriba el contenido de la sección (opcional)"
                    type="text"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}/> */}
            </div>
        </div>
    );
}

export default SectionModalComponent;
