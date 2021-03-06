// Toggle button for the side menu.  (Global)
document.getElementById('button-sidebar').addEventListener("click", () => {
    halfmoon.toggleSidebar();
    // TODO: Fix the slide size in gliders
});

// Adding the last URL to every a element with the 'js-set-previous-url' class.
/*document.querySelectorAll("a.js-set-previous-url").forEach(element => {
    element.href = document.referrer;
    element.addEventListener('click', function(e) {
        window.history.go(-2);
    });
});*/

// TOX ID copiers.  (Contact page)
if(document.getElementById('button-copy-tox-id-main') != null) {
    document.getElementById('button-copy-tox-id-main').addEventListener("click", () => {
        navigator.clipboard.writeText("62C1A91A425F90D7B4F047D70CCF31E7402C9EC37B93604B0F37C416442D15044AF6C1AE033B");
    });
}

if(document.getElementById('button-copy-tox-id-backup') != null) {
    document.getElementById('button-copy-tox-id-backup').addEventListener("click", () => {
        navigator.clipboard.writeText("01ABBD4515C8FA56231333D1022CEEE0A605F4E85F8A945365F56D196A1BBA10FB4DCE08DBE8");
    });
}

// Creating the galleries from Glider.js
window.addEventListener('load', function(){
    document.querySelectorAll(".glider").forEach(element => {
        new Glider(element, {
            slidesToShow: 1,
            //draggable: true,
            scrollLock: true,
            scrollLockDelay: 125,
            rewind: true,
            arrows: {
                prev: element.previousSibling,
                next: element.nextSibling
            },
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        duration: 0.25
                    }
                },{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        element.childNodes[0].childNodes.forEach(childElement => {
            if(childElement.childNodes[0].tagName === "IMG") {
                childElement.childNodes[0].onclick = function() {
                    let imageElement = document.getElementById("modal-img");
                    imageElement.src = childElement.childNodes[0].src;
                    imageElement.alt = childElement.childNodes[0].alt;
                    halfmoon.toggleModal('modal-content-image-viewer');
                    console.log("Opening image...");
                };
            }
        });
    });

    // It looks like ass, jesus...
    let eImgModalCloseButton = document.getElementById("modal-img-close");
    if(eImgModalCloseButton != null) {
        eImgModalCloseButton.onclick = function() {
            halfmoon.toggleModal('modal-content-image-viewer');
        }
    }
})