import './SectionComponent.scss';
import React from 'react';

function SectionComponent(props) {

  return (
    <div>
        <p className="sectionTittle">{props.title}</p>
        <p className="sectionDescription">{props.description}</p>
    </div>
  );
}

export default SectionComponent;
