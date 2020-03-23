import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';
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

  return (
    //<Grid container direction="column" className="fullHeight">
    <Grid container item direction="column" alignItems="center" justify="center" className="fullHeight">
      <Grid item>
        <h3>Create project</h3>
      </Grid>
      <Grid item>
        <TextField
          label="Project name"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
          <Grid item>
            <Button variant="contained" onClick={() => props.history.push('/')}>Back</Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={createProjectFile}
            >Create Project</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    //</Grid>
  )
}

const NewProject = inject('ProjectStore')(observer(CreateProject))
export default NewProject;