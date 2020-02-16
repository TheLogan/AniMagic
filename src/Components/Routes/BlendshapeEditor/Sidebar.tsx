import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { BlendShape } from '../../../Models/BlendShape';

interface IProps {
  Blendshapes: BlendShape[];
}

export function Sidebar(props: IProps) {
  return <Grid>
    <Grid container direction="column" justify="flex-start" alignItems="center" spacing={2} style={{ backgroundColor: '#424242', zIndex: 2000 }}>
      <Grid item>
        <Button variant="contained">hello world</Button>
      </Grid>
      <Grid item>
        <Button variant="contained">hello world</Button>
      </Grid>
    </Grid>
  </Grid>
}