import { Request, Response } from 'express';
import { getSavesPath } from '../Helpers/FileHelper';
import { ProjectModel } from '../Models/ProjectModel';
const fs = require('fs');
const path = require('path');
var express = require('express');
var router = express.Router();

router.post('/save', (req: Request, res: Response) => {
  try {
    let { project } = req.body;
    if (!project) return res.status(400).send();

    let filepath = path.join(getSavesPath(), project.projectName + '.animagic');
    fs.writeFileSync(filepath, JSON.stringify(project));
    res.status(200).send(true);

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/load', (req: Request, res: Response) => {
  try {
    let files = loadProjectFiles(getSavesPath());
    if (typeof files === 'string') {
      return res.status(500).send(files);
    }
    res.status(200).send(files);

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


function loadProjectFiles(dirname) {
  try {
    let filenames = fs.readdirSync(dirname);
    let projects: ProjectModel[] = [];
    for (const fileName of filenames) {
      let fileStr = fs.readFileSync(path.join(dirname, fileName), 'utf-8');
      projects.push(JSON.parse(fileStr));
    }
    return projects;
  } catch (error) {
    console.log(error);
    return 'could not find project files';
  }
}

module.exports = router;