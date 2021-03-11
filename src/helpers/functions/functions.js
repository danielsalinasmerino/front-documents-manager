//
// Sorts an array of objects by one of the properties of the objects
//
export function sortArrayOfObjectsByProperty(anArrayOfObjects, propertyName){

    return anArrayOfObjects.sort((a, b) => (a.propertyName) - (b.propertyName));
}