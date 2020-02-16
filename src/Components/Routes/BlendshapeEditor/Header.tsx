import React from 'react';
import { Grid } from '@material-ui/core';
import { MasterHeader } from '../../Shared/MasterHeader';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps { }

export function Header(props: IProps) {
  return <MasterHeader pageTitle="Blendshapes" {...props}>
    <Grid container >

    </Grid>
  </MasterHeader>
}