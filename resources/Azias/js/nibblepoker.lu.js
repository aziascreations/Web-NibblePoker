// Toggle button for the side menu.  (Global)
document.getElementById('button-sidebar').addEventListener("click", () => {
    halfmoon.toggleSidebar();
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
