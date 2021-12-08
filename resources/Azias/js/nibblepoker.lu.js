// TODO: Fix this !!!
document.getElementById("sbl-home").classList.add("active");

// Checking if the hamburger button for the side menu has been clicked
const element = document.getElementById('profile_title')

// always checking if the element is clicked, if so, do alert('hello')
document.getElementById('button-sidebar').addEventListener("click", () => {
    halfmoon.toggleSidebar();
});

document.getElementById('button-copy-tox-id-main').addEventListener("click", () => {
    navigator.clipboard.writeText("62C1A91A425F90D7B4F047D70CCF31E7402C9EC37B93604B0F37C416442D15044AF6C1AE033B");
});
document.getElementById('button-copy-tox-id-backup').addEventListener("click", () => {
    navigator.clipboard.writeText("01ABBD4515C8FA56231333D1022CEEE0A605F4E85F8A945365F56D196A1BBA10FB4DCE08DBE8");
});