import { path as rootPath } from "app-root-path";
const fs = require('fs');
const path = require('path');

export function getSavesPath() {
  return path.join(rootPath, '..', 'saves');
}
export function createStructure() {
  if (!fs.existsSync(getSavesPath())) {
    fs.mkdirSync(getSavesPath());
  }
}