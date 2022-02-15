import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, RouteComponentProps } from "react-router-dom";
import Main from "./Components/Routes/Main/Main";
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import SetupRig from './Components/Routes/SetupRig/SetupRig';
import BlendshapeEditor from './Components/Routes/BlendshapeEditor/BlendshapeEditor';
import CreateProject from './Components/Routes/CreateProject/CreateProject';
import { SnackbarManager } from './Helpers/SnackbarManager/SnackbarManager';
import LoadProject from './Components/Routes/LoadProject/LoadProject';
import { observer, inject } from 'mobx-react';
import { ProjectStore } from './Mobx/ProjectStore'
import { ProjectHelper } from './Helpers/ProjectHelper';
import { ServoManager } from './Helpers/ServoManager';
import { createStructure } from './Helpers/FileHelper';

interface IProps extends RouteComponentProps { ProjectStore: ProjectStore }

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ff8f00',
      dark: '#c56000',
      light: '#ffc046',
    },
    secondary: {
      main: '#0288d1',
      dark: '#005b9f',
      light: '#5eb8ff'
    }
  },
});

function App(props: IProps) {
  const [projectHelper] = useState(new ProjectHelper());
  useState(new ServoManager())

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        console.log('ctrl+s clicked');
        saveProject();

        //TODO: Save project
      }
    }, false);
    createStructure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveProject() {
    let project = props.ProjectStore.getProject();
    if (!project) return SnackbarManager.Instance.addError('No project to save');
    let result: boolean = await projectHelper.saveProject(project);
    if (result !== true) {
      SnackbarManager.Instance.addError('could not save files');
    } else {
      SnackbarManager.Instance.addSuccess('Project saved');
      props.ProjectStore.isDirty = false;
    }
  }

  useEffect(() => {
    if (props.ProjectStore.projectExists === false) {
      document.title = '*no project*';
      return;
    }
    let unsaved = props.ProjectStore.isDirty ? '*unsaved changes*' : '';
    document.title = unsaved + props.ProjectStore.projectName;
  }, [props.ProjectStore.changeDirty, props.ProjectStore.projectName, props.ProjectStore.isDirty, props.ProjectStore.projectExists])



  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarManager />
      <BrowserRouter>
        <Switch>
          <Route path="/createproject" component={CreateProject} />
          <Route path="/loadproject" component={LoadProject} />
          <Route path="/setuprig" component={SetupRig} />
          <Route path="/editblendshapes" component={BlendshapeEditor} />
          <Route path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const injectedApp = inject('ProjectStore')(observer(App))
export default injectedApp;