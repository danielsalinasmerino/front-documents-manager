import React from 'react';

import SectionComponent from '../section-component/SectionComponent';

import './SectionsComponent.scss';

function SectionsComponent({ sections, documents, editableSections, editSectionCallback }) {

    const clickEditButton = (element) => {
        editSectionCallback(element);
    }

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
                        documents={getSectionDocuments(element.idSection)}
                        clickEditButtonCallback={() => clickEditButton(element)}/>
                )
            }
        </div>
    );
}

export default SectionsComponent;