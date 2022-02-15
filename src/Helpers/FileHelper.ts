const electron = window.require('electron');
const fs = electron.remote.require('fs');
const app = electron.remote.app;
let path = electron.remote.require('path');


export function parseTextFile(file: File): Promise<string[] | any> {
  // Always return a Promise
  return new Promise((resolve, reject) => {
    let content = '';
    const reader = new FileReader();
    // Wait till complete
    reader.onloadend = function (e: any) {
      content = e.target.result;
      const result = content.split(/\r\n|\n/);
      resolve(result);
    };
    // Make sure to handle error states
    reader.onerror = function (e: any) {
      reject(e);
    };
    reader.readAsText(file);
  });
}


export function getSavesPath() {
  return path.join(app.getPath('userData'), 'saves');
}
export function createStructure() {
  if (!fs.existsSync(getSavesPath())) {
    fs.mkdirSync(getSavesPath());
  }
}