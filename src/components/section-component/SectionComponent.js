import './SectionComponent.scss';
import React from 'react';

function SectionComponent({ title, description, documents}) {

  

  return (
    <div className="sectionWrapper">
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
  );
}

export default SectionComponent;
