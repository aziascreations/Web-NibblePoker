// TODO: Move into a common lib at some point !

import {localize} from "./lang";

/**
 * Retrieves a `template` element from the current document and returns it while optionally removing it from the DOM.
 * @param templateId
 * @param removeFromDocument
 */
export function retrieveTemplate(templateId: string, removeFromDocument: boolean): DocumentFragment {
    const retrievedTemplate = document.querySelector(`template#${templateId}`);

    if(retrievedTemplate === null) {
        alert(localize("error.templatator.template.404"));
        throw Error(localize("error.templatator.template.404"));
    }

    const templateFragment = (retrievedTemplate.cloneNode(true) as HTMLTemplateElement).content;

    if(removeFromDocument) {
        retrievedTemplate.remove();
    }

    return templateFragment;
}

/**
 * Converts a given `DocumentFragment` in a cloned `HTMLElement` that can be manipulated and inserted back into the DOM.
 * @param fragment
 */
export function makeElementFromFragment(fragment: DocumentFragment): HTMLElement {
    return (fragment.cloneNode(true) as DocumentFragment).firstElementChild as HTMLElement;
}

export function wipeAllIds(eRootElement: HTMLElement, doLabels: boolean = true): void {
    eRootElement.querySelectorAll(`*`).forEach(eElement => {
        if(eElement.hasAttribute("id")) {
            eElement.removeAttribute("id");
        }
    });
    if(doLabels) {
        eRootElement.querySelectorAll(`label`).forEach(eLabel => {
            if (eLabel.hasAttribute("for")) {
                eLabel.removeAttribute("for");
            }
        });
    }
}

export function appendToAllIds(eRootElement: HTMLElement, newIdSuffix: string, doLabels: boolean = true): void {
    eRootElement.querySelectorAll(`input, select, p, div`).forEach(eElement => {
        if(eElement.hasAttribute("id")) {
            eElement.setAttribute("id", eElement.getAttribute("id") + newIdSuffix);
        }
    });
    if(doLabels) {
        eRootElement.querySelectorAll(`label`).forEach(eLabel => {
            if(eLabel.hasAttribute("for")) {
                eLabel.setAttribute("for", eLabel.getAttribute("for") + newIdSuffix);
            }
        });
    }
}
