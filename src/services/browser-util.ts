export class BrowserUtil {
    public checkFileApiSupport() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
            console.log('Browser supports the File API');
        } else {
            console.log('The File APIs are not fully supported in this browser.');
        }
    }
}
