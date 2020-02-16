import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Grid, CardContent, Card, CardHeader } from '@material-ui/core';
import { ProjectHelper } from '../../../Helpers/ProjectHelper';
import { Project } from '../../../Models/Project';
import { SnackbarManager } from '../../../Helpers/SnackbarManager/SnackbarManager';
import "./LoadProject.css";
import { observer, inject } from 'mobx-react';
import { ProjectStore } from '../../../Mobx/ProjectStore';

interface IProps extends RouteComponentProps { ProjectStore: ProjectStore }

function LoadProject(props: IProps) {
  const projectHelper = new ProjectHelper();
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

    SnackbarManager.Instance.addSuccess('Project loaded');
    props.ProjectStore.addProject(new Project(project));
    props.history.push('/');
  }

  function renderCards() {
    console.log('projects.length', projects.length);
    let arr = []
    for (let y = 0; y < projects.length / 5; y++) {
      console.log('y', y);
      let innerArr = []
      for (let x = 0; x < 5; x++) { //FIXME: somehow it renderes duplicates
        let project = projects[y * x + x];
        if (project == null) break;
        innerArr.push(
          <Grid item>
            <Card
              key={project.projectName}
              className={"projectCard" + (project.projectName === selectedProject ? " active" : "")}
              onClick={() => setSelectedProject(project.projectName)}
            >
              <CardHeader title={project.projectName} >
              </CardHeader>
              <CardContent>
                <p>Date</p>
                <p>Servo-count</p>
              </CardContent>
            </Card>
          </Grid>
        )
      }
      arr.push(<Grid item container direction="row" spacing={3}>{innerArr}</Grid>);
    }
    return arr;
  }

  return <Grid container direction="column" justify="center" alignItems="center" style={{ height: '100vh' }}>
    <Grid item xs={1}>
      <h1>Load project</h1>
    </Grid>
    <Grid item xs={10} container direction="column" justify="center" alignItems="center" spacing={3}>
      {renderCards()}
    </Grid>
    <Grid item xs={1}>
      <Button onClick={doLoadProject}>Load</Button>
    </Grid>
  </Grid>
}


const LoadsProject = inject('ProjectStore')(observer(LoadProject))
export default LoadsProject;