/*
 Classlist "polyfill"

 Author: Nicolaj Lund Nielsen <nni@dis-play.dk>
 Modified by: Anders Gissel <agi@dis-play.dk>
 ************************************************************************************************************

 Native classlist cannot be polyfilled properly on IE10 and IE11, since they support the basic functions but
 do not have support for "toggle", for example. This file provides working classlist implementation, with
 hacks to make everything work in IE9 and below as well.

 To use:

     import { addClass, removeClass } from './utils/classList';

     let element = document.querySelector('.anElement');
     addClass(element, 'someClass');
     removeClass(element, 'anotherClass');

 A default object adhering to "classList naming conventions" ("add", "remove", "toggle" etc.)
 is also exported, but for the sake of tree shaking and ease-of-use, you should import only the
 helpers you need. And if so, please use "addClass", "removeClass", "toggleClass" and "hasClass",
 because it's much easier to understand.

*/



import forEach from '../forEach';
import splitter from '../splitter';



/**
 * This function adds a class to the given element.
 * Checking for classList since this isn't supported in IE9 / IE8
 *
 * @param {Element|Element[]|Node|Node[]|NodeList} input
 * @param {string|string[]} classNames
 */
export function add(input, classNames) {
    forEach(input, element => {
        splitter(classNames, className => {
            if (element.classList) {
                element.classList.add(className);
            } else {
                element.className += ` ${className}`;
            }
        });
    });
}


/**
 * @type {function}
 */
export const addClass = add;



/**
 * This function checks if given element has the class specified.
 * Checking for classList since this isn't supported in IE9 / IE8.
 * This function does NOT support nodelists or arrays.
 *
 * @param {Element|HTMLElement|Node} element
 * @param {string} className
 * @returns {boolean}
 */
export function contains(element, className) {
    if (element && (element.classList || element.className)) {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp(`(^| ) ${className}( |$)`, 'gi').test(element.className);
        }
    }

    return false;
}

/**
 * @type {function}
 */
export const hasClass = contains;



/**
 * This function removes a class from the given element.
 * Checking for classList since this isn't supported in IE9 / IE8
 *
 * @param {Element|Element[]|Node|Node[]|NodeList} input
 * @param {string|string[]} classNames
 */
export function remove(input, classNames) {
    forEach(input, element => {
        splitter(classNames, className => {
            if (element.classList) {
                element.classList.remove(className);
            } else {
                element.className = element.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
            }
        });
    });
}

/**
 * @type {function}
 */
export const removeClass = remove;


/**
 * Toggle a class.
 *
 * @param {Element|Element[]|Node|Node[]|NodeList} input - The HTML element to work with
 * @param {string|string[]} classNames - The class name(s) we'll be toggling
 * @param {boolean} [condition] - Optional condition. If set to true or false, the toggle will use the given value to add or remove the class. If undefined, a regular toggle will be performed.
 */
export function toggle(input, classNames, condition) {
    forEach(input, element => {
        splitter(classNames, className => {
            let classShouldBeIncluded;
            const classIsIncludedAlready = contains(element, className);

            // If a condition is given, we'll use that to figure out if the class should be added or not.
            if (condition !== undefined) {
                // We'll only continue if the condition doesn't match the current state. So we'll only remove the
                // class if it added already and the condition is "false", and vice versa.
                if (condition !== classIsIncludedAlready) {
                    classShouldBeIncluded = condition;
                }
            } else {
                // No condition was given, so we'll just toggle the class.
                classShouldBeIncluded = !classIsIncludedAlready;
            }

            // Only continue if a new mode is defined. Otherwise there's no point.
            if (classShouldBeIncluded !== undefined) {
                if (classShouldBeIncluded) {
                    add(element, className);
                } else {
                    remove(element, className);
                }
            }

        });

    });
}

/**
 * @type {function}
 */
export const toggleClass = toggle;




/**
 * Export default object containing all regular methods using the regular classList naming scheme.
 */
export default {
    add,
    remove,
    contains,
    toggle
};
