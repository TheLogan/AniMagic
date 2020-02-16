import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { MasterHeader } from "../../Shared/MasterHeader";

interface IProps extends RouteComponentProps {
  addCard: () => void;
  load: (a: any) => void;
}

export function Header(props: IProps) {
  let fileInputRef: HTMLInputElement | null = null;
  return <MasterHeader pageTitle="Setup Rig" {...props}>
    <Grid container >

      <Grid item xs={11}>

        <Grid container direction="row" justify="flex-end">
          <Button variant="contained" color="secondary" onClick={props.addCard}>Add Servo</Button>
          {/* <Button variant="contained" color="secondary" onClick={props.save}>Save</Button> */}

          <input ref={fileInput => fileInputRef = fileInput} type="file" accept=".arig" onChange={props.load} hidden />
          <Button variant="contained" color="secondary" onClick={() => fileInputRef?.click()}> Load </Button>
        </Grid>
      </Grid>
    </Grid>
  </MasterHeader>


  // return <Grid container direction="row" justify="space-around" alignItems="center" >
  //   <Grid item>
  //     <Button startIcon={<i className="fa fa-arrow-circle-left"></i>}
  //       onClick={() => props.history.push('/')}
  //     ></Button>
  //   </Grid>
  //   <Grid item xs={1}>
  //     <h1 className="unselectableText"></h1>
  //   </Grid>
  //   <Grid item xs={1}>
  //     <TextField
  //       label="Project name"
  //       value={props.projectName}
  //       onChange={e => props.changeProjectName(e.target.value)}
  //     />
  //   </Grid>
  //   <Grid item xs={8}>
  //     <Grid container direction="row" justify="flex-end">
  //       <Button variant="contained" color="secondary" onClick={props.addCard}>Add Servo</Button>
  //       <Button variant="contained" color="secondary" onClick={props.save}>Save</Button>

  //       <input
  //         ref={fileInput => fileInputRef = fileInput}
  //         type="file"
  //         accept=".arig"
  //         onChange={props.load}
  //         hidden
  //       />

  //       <Button variant="contained" color="secondary" onClick={() => fileInputRef?.click()}> Load </Button>
  //     </Grid>
  //   </Grid>
  // </Grid>
}