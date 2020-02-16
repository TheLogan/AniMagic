import React, { useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { ProjectStore } from '../../../Mobx/ProjectStore';
import { SnackbarManager } from '../../../Helpers/SnackbarManager/SnackbarManager';
import "./Sidebar.css";

interface IProps {
  ProjectStore: ProjectStore;
  selectedBlendshape: string;
  selectBlendshape: (id: string) => void;
}

function Sidebar(props: IProps) {
  useEffect(() => { }, [props.ProjectStore.blendShapes])

  function AddBlendShape() {
    if (props.ProjectStore.projectExists === false) {
      return SnackbarManager.Instance.addError('No project loaded');
    }

    if (props.ProjectStore.rig.length < 1) return SnackbarManager.Instance.addError('No rig created');

    props.ProjectStore.AddBlendShape();
  }

  return <Grid>
    <Grid container direction="column" justify="flex-start" alignItems="center" spacing={2} style={{ backgroundColor: '#424242', zIndex: 2000 }}>
      {props.ProjectStore.blendShapes.map(blendShape => {
        return <Grid item>
          <Button
            variant="contained"
            color={blendShape.id === props.selectedBlendshape ? "primary" : 'default'}
            className='blendshapeButton' onClick={() => props.selectBlendshape(blendShape.id)}
          >
            {blendShape.name}
          </Button>
        </Grid>
      })}
      <Grid item>
        <Button variant="contained" onClick={AddBlendShape}>Add blendshape</Button>
      </Grid>
    </Grid>
  </Grid>
}

const SideBarComp = inject('ProjectStore')(observer(Sidebar))
export default SideBarComp;