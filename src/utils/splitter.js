


/**
 * If a string is given, split it by spaces and commas to get an array. If an array is given, no further pre-processing happens.
 * Then run the given callback function for each entry.
 *
 * @param {string|Array} input - String containing one or more items, separated by space/comma, or an array of entries.
 * @param {function} callback - Callback function to run for each entry in the given array.
 */
export default function splitter(input, callback) {

    const inputArray = typeof input === "string" ?
        input
            .replace(/,/gm, " ") // First, replace commas with spaces
            .replace(/[\s]{2,}/gm, " ") // Then, replace two or more spaces with just one.
            .trim() // Remove leading/trailing whitespace and similar crap
            .split(" ") :
        Array.isArray(input) ? input : [];


    inputArray.forEach(inputEntry => {
        if (inputEntry !== undefined) {
            callback(inputEntry);
        }
    });
}
