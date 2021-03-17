//
// Sorts an array of objects by one of the properties of the objects
//
export function sortArrayOfObjectsByProperty(anArrayOfObjects, propertyName){

    return anArrayOfObjects.sort((a, b) => (a.propertyName) - (b.propertyName));
}

//
// Creates an id given the length needed
//
export function makeId(length = 16) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }