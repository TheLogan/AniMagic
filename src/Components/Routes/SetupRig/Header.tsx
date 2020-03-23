import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { MasterHeader } from "../../Shared/MasterHeader";

interface IProps extends RouteComponentProps {
  addCard: () => void;
}

export function Header(props: IProps) {
  return <MasterHeader pageTitle="Setup Rig" {...props}>
    <Grid container >
      <Grid item xs={11}>
        <Grid container direction="row" justify="flex-end">
          <Button variant="contained" color="secondary" onClick={props.addCard}>Add Servo</Button>
        </Grid>
      </Grid>
    </Grid>
  </MasterHeader>
}