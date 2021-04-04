import React from 'react';

import DocumentsComponent from '../documents-component/DocumentsComponent';
import SectionOptionsComponent from '../section-options-component/SectionOptionsComponent';

import './SectionComponent.scss';

function SectionComponent({ title, description, documents, editableSection}) {

  return (
    <div className={editableSection ? "sectionWrapper editable" : "sectionWrapper"}>
      <div className ="sectionMain">
        <p className="sectionTittle">{title}</p>
        <p className="sectionDescription">{description}</p>
        <DocumentsComponent documents={documents}/>
      </div>
      {
        editableSection && <SectionOptionsComponent />
      }
    </div>
  );
}

export default SectionComponent;
