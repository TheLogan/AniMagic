import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Card, CardHeader, TextField, CardContent } from '@material-ui/core';
import { Header } from './Header';
import Sidebar from './Sidebar';
import { observer, inject } from 'mobx-react';
import { ProjectStore } from '../../../Mobx/ProjectStore';
import Draggable from 'react-draggable';
import { SnackbarManager } from '../../../Helpers/SnackbarManager/SnackbarManager';
import { ServoHelper } from '../../../Helpers/ServoHelper';

interface IProps extends RouteComponentProps { ProjectStore: ProjectStore }

function BlendshapeEditor(props: IProps) {
  const [selectedBlendshape, setSelectedBlendshape] = useState('');
  const [servoHelper] = useState(new ServoHelper())


  useEffect(() => { }, [props.ProjectStore.blendShapes])

  function changeServoValue(valueStr: string, id: string) {
    let value = Number(valueStr);
    if (isNaN(value)) return;

    let blendServo = props.ProjectStore.blendShapes.find(x => x.id === selectedBlendshape)?.servos.find(x => x.id === id);
    let servo = props.ProjectStore.rig.find(x => x.id === id);
    if (!blendServo || !servo) return SnackbarManager.Instance.addError('Fatal Error: Unknown servo id');

    if (value > servo.max) value = servo.max;
    if (value < servo.min) value = servo.min;

    let result = props.ProjectStore.setBlendServoValue(selectedBlendshape, id, value);
    if (result === false) SnackbarManager.Instance.addError('Fatal Error: Could not save value');

    // Send value to the server
    servoHelper.moveToPosition(servo, value);
  }

  function renderBody() {
    let selectedBlendShape = props.ProjectStore.blendShapes.find(x => x.id === selectedBlendshape);
    if (!selectedBlendshape || !selectedBlendShape) return <h1>Select a blendshape</h1>

    let html = selectedBlendShape.servos.map(servo => {
      let servoObj = props.ProjectStore.rig.find(x => x.id === servo.id);
      return (
        <Draggable
          position={{ x: servoObj?.htmlPosX || servo.htmlPosX, y: servoObj?.htmlPosY || servo.htmlPosY }}
          key={servo.id}
          disabled={true}
        >
          <Card style={{ position: 'absolute', zIndex: window.screen.height - servo.htmlPosY, width: '300px', height: '200px' }} >
            <CardHeader className="unselectableText"
              title={servo.name}
            />
            <CardContent className="CardContent" >
              <p>[min: {servoObj?.min}, max: {servoObj?.max}]</p>
              <TextField
                variant="filled"
                label="Position"
                value={servo.position}
                onChange={e => changeServoValue(e.target.value, servo.id)}
              />
            </CardContent>
          </Card>
        </Draggable>
      )
    })

    return <Grid container direction="column">
      <Grid item>
        <TextField label="Name"
          value={selectedBlendShape.name}
          onChange={e => {
            props.ProjectStore.setBlendshapeName(selectedBlendShape!.id, e.target.value);
          }}
        />
      </Grid>
      <Grid item>
        {html}
      </Grid>
    </Grid>
  }

  function selectBlendshape(id: string) {
    let blendshape = props.ProjectStore.blendShapes.find(x => x.id === id);
    if (!blendshape) return;
    setSelectedBlendshape(id);
    servoHelper.moveToBlendShape(blendshape, props.ProjectStore.rig);
    //TODO: Send positions to the board
  }

  //Load blendshapes
  return <Grid container>
    <Grid item xs={12}>
      <Header {...props} />
    </Grid>
    <Grid container>
      <Grid item xs={2}>
        <Sidebar {...props} selectBlendshape={selectBlendshape} selectedBlendshape={selectedBlendshape} />
      </Grid>
      <Grid item xs={10}>
        <Grid container>

          {renderBody()}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}

const EditBlendshape = inject('ProjectStore')(observer(BlendshapeEditor))
export default EditBlendshape;