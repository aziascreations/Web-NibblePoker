// NibblePoker - Download Helpers
// Author: Herwin Bozet (@NibblePoker)
// License: Public Domain (This code, except for the data)

export function downloadStringAsFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
