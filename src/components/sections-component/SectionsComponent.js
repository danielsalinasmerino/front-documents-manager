import React from 'react';

import SectionComponent from '../section-component/SectionComponent';

import './SectionsComponent.scss';

function SectionsComponent({ sections, documents, editableSections }) {

    const  getSectionDocuments = (idSection) => {
        return documents.filter(document => { return document.sectionID === idSection });
    }

    return (
        <div>
            { 
                sections.map(element => 
                    <SectionComponent 
                        key={element.idSection} 
                        editableSection={editableSections}
                        title={element.title} 
                        description={element.description}
                        documents={getSectionDocuments(element.idSection)}>
                    </SectionComponent>
                )
            }
        </div>
    );
}

export default SectionsComponent;
