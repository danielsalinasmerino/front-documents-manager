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
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }