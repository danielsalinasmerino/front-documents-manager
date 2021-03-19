// Import classes
import { Section } from '../../models/section';

// Other imports
import { makeId } from '../../helpers/functions/functions';

export const initialSections = [

    new Section(
      makeId(),
      "Solicitud de actualización de incidencias en la Gestión Horaria",
      "Todas las solicitudes de actualización de incidencias en la Gestión Horaria deben estar firmadas por el interesado y validadas por el Responsable de Unidad/ Sección o Subdirector correspondiente",
      new Date(2021, 2, 2, 0, 0, 0, 0),
      new Date(2021, 2, 2, 0, 0, 0, 0),
      1, 
      null, // To do (parentID)
      null  // To do (portalID)
    ),

    new Section(
      makeId(),
      "Modificación datos",
      "Este trámite debe realizarse a través de Politécnica Virtual",
      new Date(2021, 2, 3, 0, 0, 0, 0),
      new Date(2021, 2, 3, 0, 0, 0, 0),
      2, 
      null, // To do (parentID)
      null  // To do (portalID)
    ),

    new Section(
      makeId(),
      "Solicitud genérica",
      "Esta solicitud es genérica y sirve para distintas ocasiones. Es importante poner en el pie del documento a quién va dirigida la solicitud. En el formato PDF vienen definidas las opciones más comunes.",
      new Date(2021, 2, 5, 0, 0, 0, 0),
      new Date(2021, 2, 5, 0, 0, 0, 0),
      3, 
      null, // To do (parentID)
      null  // To do (portalID)
    ),

    new Section(
      makeId(),
      "Solicitud de Compatibilidad",
      "Es necesario presentar siempre cuatro documentos: 1. Solicitud de compatibilidad con una segunda actividad, ya sea en el sector privado o en el público (son impresos diferentes). 2. Certificado de horario en la Escuela. 3. Certificado del horario a realizar en la segunda empresa. 4. Una vida laboral actualizada. Impresos",
      new Date(2021, 2, 8, 0, 0, 0, 0),
      new Date(2021, 2, 8, 0, 0, 0, 0),
      4, 
      null, // To do (parentID)
      null  // To do (portalID)
    ),

    new Section(
      makeId(),
      "Solicitud contratación temporal",
      "",
      new Date(2021, 1, 2, 0, 0, 0, 0),
      new Date(2021, 1, 2, 0, 0, 0, 0),
      5, 
      null, // To do (parentID)
      null  // To do (portalID)
    ),

    new Section(
      makeId(),
      "Otros impresos UPM para PAS Laboral",
      "",
      new Date(2021, 2, 10, 0, 0, 0, 0),
      new Date(2021, 2, 10, 0, 0, 0, 0),
      6, 
      null, // To do (parentID)
      null  // To do (portalID)
    ),

    new Section(
      makeId(),
      "Otros impresos UPM para PAS Funcionario",
      "",
      new Date(2021, 1, 12, 0, 0, 0, 0),
      new Date(2021, 1, 12, 0, 0, 0, 0),
      7, 
      null, // To do (parentID)
      null  // To do (portalID)
    ),

  ];