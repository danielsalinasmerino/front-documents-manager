import './SectionComponent.scss';
import React from 'react';

function SectionComponent(props) {

  

  return (
    <div>
        <p className="sectionTittle">{props.title}</p>
        <p className="sectionDescription">{props.description}</p>
        <ul className="sectionDocumentsList">
          { 
            props.documents.map(element => 
              <li key={element.idDocument} >
                <a href={element.documentUrl}>{element.title}</a>
              </li> 
            )
          }
        </ul>
    </div>
  );
}

export default SectionComponent;
