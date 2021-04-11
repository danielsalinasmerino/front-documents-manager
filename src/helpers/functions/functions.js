//
// Sorts an array of sections by the position
//
export function sortArrayOfSectionsByPosition(anArrayOfSections){

    return anArrayOfSections.sort((a, b) => (a.position) - (b.position));
}
    
//
// Creates an id given the length needed
//
export function makeId(length = 32) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//
// Reorders entirely the sections once we edit one of the lot
//
export function reorderSectionsAfterEdition(anArrayOfSections, edittedSectionOldPosition, edittedSectionNewPosition){

    // We make this fix because our positions starts on 1, and the array index starts on 0
    edittedSectionOldPosition = edittedSectionOldPosition - 1;
    edittedSectionNewPosition = edittedSectionNewPosition - 1;

    // We move the elements
    while (edittedSectionOldPosition < 0) {
        edittedSectionOldPosition += anArrayOfSections.length;
    }
    while (edittedSectionNewPosition < 0) {
        edittedSectionNewPosition += anArrayOfSections.length;
    }
    if (edittedSectionNewPosition >= anArrayOfSections.length) {
        var k = edittedSectionNewPosition - anArrayOfSections.length;
        while ((k--) + 1) {
            anArrayOfSections.push(undefined);
        }
    } 
    anArrayOfSections.splice(edittedSectionNewPosition, 0, anArrayOfSections.splice(edittedSectionOldPosition, 1)[0]);  

    // We update the position for all elements
    for(let i = 0; i < anArrayOfSections.length; i++){
        anArrayOfSections[i].position = (i + 1);
    }

    // We return the array, ordered by position
    return sortArrayOfSectionsByPosition(anArrayOfSections);
}

//
// Add a new section to the lot
//
export function addNewSection(oldSections, newSection){

    const newSectionPosition = newSection.position;
    
     for(let i = 0; i < oldSections.length; i++){
        if(newSectionPosition <= oldSections[i].position){
            oldSections[i].position = oldSections[i].position + 1;
        }
    }

    oldSections.push(newSection);

    return oldSections;
}