let isSidebarVisible = true;

document.addEventListener("DOMContentLoaded", () => {
    const eSidebar = document.getElementById("sidebar");
    const eMain = document.getElementById("main");
    
	document.getElementById("sidebar-toggle-footer").onclick = function () {
        if(isSidebarVisible) {
	        eSidebar.classList.add("retracted");
			eMain.classList.add("expanded");
        } else {
	        eSidebar.classList.remove("retracted");
	        eMain.classList.remove("expanded");
        }
        isSidebarVisible = !isSidebarVisible;
	};
	
	// TODO: Autodetect mobile screens, close it, and add classes to make it over the rest with dark modal bkgd.
});
