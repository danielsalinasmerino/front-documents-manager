import React, { useState } from 'react';

import './SectionOptionComponent.scss';

function SectionOptionComponent({ normalImageRoute, hoveredImageRoute, altText, tooltipText}) {

  const [hovered, setHover] = useState(false);

  return (
        <div className="sectionOption" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            { !hovered && <img className="optionImage" src={normalImageRoute} alt={altText}/> }
            {  hovered && <img className="optionImage" src={hoveredImageRoute} alt={altText}/> }
        </div>
  );
}

export default SectionOptionComponent;
