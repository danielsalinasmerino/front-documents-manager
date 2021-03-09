export function sortArrayOfObjectsByProperty(anArrayOfObjects, propertyName){

    return anArrayOfObjects.sort((a, b) => (a.propertyName) - (b.propertyName));
}