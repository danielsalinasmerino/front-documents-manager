import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';

import EditionComponent from './components/edition-component/EditionComponent';
import PreviewComponent from './components/preview-component/PreviewComponent';

import { initialSections } from './helpers/resources/initialSections';
import { initialDocuments } from './helpers/resources/initialDocuments';

import { sortArrayOfSectionsByPosition } from './helpers/functions/functions';

import './App.scss';

function App() {

  const portalName = 'PAS';

  const [sections, setSections] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    setSections(sortArrayOfSectionsByPosition(initialSections));
    setDocuments(initialDocuments);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/preview">
          <PreviewComponent portalName={portalName} sections={sections} documents={documents}/>
        </Route>
        <Route path="/edition">
          <EditionComponent portalName={portalName} sections={sections} documents={documents} setSectionsCallback={setSections} setDocumentsCallback={setDocuments}/>
        </Route>
      </Switch>
      <Redirect to="/edition"/>
    </Router>
  );
}

export default App;