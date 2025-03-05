/**!
 * NibblePoker Ico Maker
 * @author	Herwin Bozet   <herwin.bozet@nibblepoker.lu>
 * @license Public Domain
 */

import {Sortable} from "../../../SortableJS/1.15.6/modular/sortable.core.esm.js"

export const appletId = "ico-maker";

{
    const eIconPartsContainer = document.getElementById(`${appletId}-icon-parts-list`);


    window.onload = function () {

        // Setting up SortableJS
        let sortable = Sortable.create(eIconPartsContainer, {
            animation: 125,  // ms, animation speed moving items when sorting, `0` — without animation
	        easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.

        });
    };
}
