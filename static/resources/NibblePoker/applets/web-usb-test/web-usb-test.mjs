/**
 * Checks if the required JS API for WebUSB is available.
 * @returns {boolean}
 */
function isWebUsbAvailable() {
    return navigator.usb !== null;
}

// Tool-centric stuff
{
    /** @type {HTMLElement} */
    const eApiSupportedText = document.querySelector("#web-usb-test-api-supported");
    /** @type {HTMLElement} */
    const eApiNonSupportedText = document.querySelector("#web-usb-test-api-not-supported");
    /** @type {HTMLElement} */
    const eApiSupportUnknownText = document.querySelector("#web-usb-test-api-support-unknown");

    /** @type {HTMLButtonElement} */
    const eListAllButton = document.querySelector("button#web-usb-test-list-all");

    /** @type {HTMLButtonElement} */
    const eBa63GetterButton = document.querySelector("button#web-usb-test-ba63-getter");

    window.onload = function () {
        if (!isWebUsbAvailable()) {
            eApiSupportUnknownText.hidden = true;
            eApiNonSupportedText.hidden = false;
            return;
        }
        eApiSupportUnknownText.hidden = true;
        eApiSupportedText.hidden = false;

        eListAllButton.addEventListener("click", function () {
            navigator.usb.getDevices().then((devices) => {
                console.log(`Total devices: ${devices.length}`);
                devices.forEach((device) => {
                    console.log(
                        `Product name: ${device.productName}, serial number ${device.serialNumber}`,
                    );
                    console.log(device);
                });
            });
        });

        eBa63GetterButton.addEventListener("click", function () {
            const filters = [
                {vendorId: 0x0AA7, productId: 0x0200},
            ];
            navigator.usb
                .requestDevice({filters})
                .then((usbDevice) => {
                    console.log(`Product name: ${usbDevice.productName}`);
                })
                .catch((e) => {
                    console.error(`There is no device. ${e}`);
                });
        });

    }
}
