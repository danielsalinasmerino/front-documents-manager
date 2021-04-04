import React, { useState } from 'react';

import Tooltip from '@material-ui/core/Tooltip';

import './SectionOptionComponent.scss';

function SectionOptionComponent({ normalImageRoute, hoveredImageRoute, altText, tooltipText}) {

  const [hovered, setHover] = useState(false);

  return (
    <Tooltip title={tooltipText} placement="left">
        <div className="sectionOption" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            { !hovered && <img className="optionImage" src={normalImageRoute} alt={altText}/> }
            {  hovered && <img className="optionImage" src={hoveredImageRoute} alt={altText}/> }
        </div>
    </Tooltip> 
  );
}

export default SectionOptionComponent;
