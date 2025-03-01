// NibblePoker - Template Utilities
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code)

/**
 * @param eTemplate {HTMLTemplateElement | string} The template to be cloned, or its ID.
 * @param subParts {Object.<string, Node | string | number | boolean>}
 * @param ignoreMissingParts {bool}
 * @returns {Promise<DocumentFragment>}
 */
export function cloneTemplate(eTemplate,
                              subParts,
                              ignoreMissingParts) {
    if (typeof eTemplate === 'string' || eTemplate instanceof String) {
        eTemplate = document.getElementById(eTemplate);
    }
    return new Promise((resolve, reject) => {
        if(eTemplate == null) {
            reject("The given template couldn't be found !");
        } else {
            /** @type {DocumentFragment} */
            let eClone = document.importNode(eTemplate.content, true);

            for (const key in subParts) {
                if (subParts.hasOwnProperty(key)) {
                    const value = subParts[key];

                    let ePart = eClone.getElementById(key);

                    if(ePart == null) {
                        if(ignoreMissingParts) {
                            continue;
                        }
                        reject(`Unable to find sub-element with id '${key}' !`);
                    }

                    if(value instanceof Node) {
                        ePart.appendChild(value);
                    } else {
                        ePart.innerHTML += value;
                    }
                }
            }

            resolve(eClone);
        }
    });
}
