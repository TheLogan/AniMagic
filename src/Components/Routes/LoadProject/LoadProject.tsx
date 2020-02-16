import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Grid, CardContent, Card, CardHeader, Box } from '@material-ui/core';
import { ProjectHelper } from '../../../Helpers/ProjectHelper';
import { Project } from '../../../Models/Project';
import { SnackbarManager } from '../../../Helpers/SnackbarManager/SnackbarManager';
import "./LoadProject.css";
import { observer, inject } from 'mobx-react';
import { ProjectStore } from '../../../Mobx/ProjectStore';
import { ServoHelper } from '../../../Helpers/ServoHelper';

interface IProps extends RouteComponentProps { ProjectStore: ProjectStore }

function LoadProject(props: IProps) {
  const [projectHelper] = useState(new ProjectHelper());
  const [servoHelper] = useState(new ServoHelper());
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState('')

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getProjects() {
    let allProjects = await projectHelper.loadProjects();
    if (!Array.isArray(allProjects)) return SnackbarManager.Instance.addError(allProjects);
    setProjects(allProjects);
  }

  function doLoadProject() {
    let project = projects.find(x => x.projectName === selectedProject);
    if (!selectedProject || !project) return SnackbarManager.Instance.addError('No project selected');
    servoHelper.centerAll(project.rig);


    SnackbarManager.Instance.addSuccess('Project loaded');
    props.ProjectStore.addProject(new Project(project));
    props.history.push('/');
  }

  function renderCards() {
    console.log('projects.length', projects.length);
    let arr = []

    for (const project of projects) {
      arr.push(
        // align-self: auto | flex-start | flex-end | center | baseline | stretch;
        <Box alignSelf="center">
          <Card
            key={project.projectName}
            className={"projectCard" + (project.projectName === selectedProject ? " active" : "")}
            onClick={() => setSelectedProject(project.projectName)}
          >
            <CardHeader title={project.projectName} >
            </CardHeader>
            <CardContent>
              <p>Date</p>
              <p>Servos: {project?.rig?.length || '0'}</p>
            </CardContent>
          </Card>
        </Box>
      )
    }
    return arr;
  }

  return <Grid container direction="column" justify="center" alignItems="center" style={{ height: '100vh' }}>
    <Grid item xs={1}>
      <h1>Load project</h1>
    </Grid>
    <Grid item xs={10}>
      <Box display="flex" flexDirection="row" alignItems="auto" flexWrap="wrap" style={{ width: "50vw" }} justifyContent="flex-start">
        {renderCards()}
      </Box>
    </Grid>
    <Grid item xs={1}>
      <Button variant="contained" color="primary" onClick={doLoadProject}>Load</Button>
    </Grid>
  </Grid>
}


const LoadsProject = inject('ProjectStore')(observer(LoadProject))
export default LoadsProject;