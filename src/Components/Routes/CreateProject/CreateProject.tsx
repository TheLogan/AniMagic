import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';
import { ProjectHelper } from '../../../Helpers/ProjectHelper';
import { Project } from '../../../Models/Project';
import { SnackbarManager } from '../../../Helpers/SnackbarManager/SnackbarManager';
import { observer, inject } from "mobx-react";
import { ProjectStore } from '../../../Mobx/ProjectStore'

interface IProps extends RouteComponentProps { ProjectStore: ProjectStore }


function CreateProject(props: IProps) {
  const [projectName, setProjectName] = useState('');

  async function createProjectFile() {
    if (!projectName) return;

    SnackbarManager.Instance.addSuccess('Project created');
    props.ProjectStore.addProjectName(projectName);
    props.history.push('/');
  }

  return <Grid>
    <TextField
      label="Project name"
      value={projectName}
      onChange={e => setProjectName(e.target.value)}
    />
    <Button
      onClick={createProjectFile}
    >Create Project</Button>
  </Grid>
}

const NewProject = inject('ProjectStore')(observer(CreateProject))
export default NewProject;