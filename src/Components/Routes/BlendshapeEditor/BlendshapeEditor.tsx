import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface IProps extends RouteComponentProps { }

export function BlendshapeEditor(props: IProps) {
  //Load blendshapes
  return <Grid container>
    <Grid item xs={12}>
      <Header {...props} />
    </Grid>
    <Grid container>
      <Grid item xs={2}>
        <Sidebar Blendshapes={[]} />
      </Grid>
      <Grid item xs={10}>
        <Grid container style={{ backgroundColor: 'red' }}>
          Render stuff here
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}