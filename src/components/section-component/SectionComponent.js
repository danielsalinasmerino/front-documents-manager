import React from 'react';

import SectionOptionsComponent from '../section-options-component/SectionOptionsComponent';

import './SectionComponent.scss';

function SectionComponent({ title, description, documents, editableSection}) {

  return (
    <div className={editableSection ? "sectionWrapper editable" : "sectionWrapper"}>
      <div className ="sectionMain">
        <p className="sectionTittle">{title}</p>
        <p className="sectionDescription">{description}</p>
        <ul className="sectionDocumentsList">
          { 
            documents.map(element => 
              <li key={element.idDocument} >
                <a href={element.documentUrl}>{element.title}</a>
              </li> 
            )
          }
        </ul>
      </div>
      {
        editableSection && <SectionOptionsComponent />
      }
    </div>
  );
}

export default SectionComponent;
