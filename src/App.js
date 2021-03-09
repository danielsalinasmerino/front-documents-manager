import './App.scss';
import React, { useEffect, useState } from 'react';

import SectionComponent from './components/section-component/SectionComponent';

import { initialSections } from './helpers/resources/initialSections';
import { sortArrayOfObjectsByProperty } from './helpers/functions/functions'

function App() {

  const [sections, setSections] = useState([]);
  useEffect(() => {
    setSections(sortArrayOfObjectsByProperty(initialSections, 'index'))
  }, []);;
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = (e) => {

    e.preventDefault();
    
    var updatedSections = sections;

    updatedSections.push({ idSection: "8",
      title: title,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
      index: 8}
    );

    setSections([...sortArrayOfObjectsByProperty(updatedSections, 'index')]);
  }

  return (
    <div className="main-wrapper">
      
      <h1>Bienvenido/a</h1>

      <h2>Seleccione el tipo de impresos que desea:</h2>

      { 
        sections.map(element => 
          <SectionComponent 
            key={element.idSection} 
            title={element.title} 
            description={element.description}>
          </SectionComponent>
        )
      }

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br/>
          <br/>
          <label>Description</label>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input type="submit" value="Submit" />
        </div>
      </form>
    
    </div>
  );
}

export default App;
