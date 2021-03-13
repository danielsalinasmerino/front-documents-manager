import './SectionModalComponent.scss';
import React from 'react';

//Import images 
import closeModal from '../../assets/images/close.png'; 

function SectionModalComponent(props) {



    return (
        <div className="sectionModalWrapper">
            <div className="modalHeader">
                <p className="titleHeader">{props.title}</p>
                <img className="closeModal" src={closeModal} alt="Close Modal" onClick={props.closeModal}/>
            </div>
            <div className="titleWrapper">
                <p className="title">Título</p>
                
            </div>
             
        </div>
    );
}

export default SectionModalComponent;
