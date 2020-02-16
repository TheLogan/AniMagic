import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';

interface IProps extends RouteComponentProps {
  children?: any;
  pageTitle: string;
}

export function MasterHeader(props: IProps) {
  return (
    <Grid container direction="row" justify="space-around" alignItems="center" style={{ backgroundColor: '#202020' }} >
      <Grid item xs={2}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <Button startIcon={<i className="fa fa-arrow-circle-left"></i>} onClick={() => props.history.push('/')} children={<></>} />
          </Grid>
          <Grid item>
            <h1 className="unselectableText">{props.pageTitle}</h1>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        {props.children}
      </Grid>
    </Grid>
  )
}