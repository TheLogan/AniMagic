import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Grid, Card, CardContent, TextField, CardHeader, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import { Header } from './Header';
import Draggable, { DraggableData } from "react-draggable";
import { ServoModel } from '../../../Models/ServoModel';
import uuidv1 from 'uuid/v1';
import './SetupRig.css';
import { parseTextFile } from '../../../Helpers/FileHelper';
import { RigData } from '../../../Models/RigData';
import { ServoManager } from '../../../Helpers/ServoManager';
import { SnackbarManager } from '../../../Helpers/SnackbarManager/SnackbarManager';
import { inject, observer } from 'mobx-react';
import { ProjectStore } from '../../../Mobx/ProjectStore'

interface IProps extends RouteComponentProps { ProjectStore: ProjectStore }

function SetupRig(props: IProps) {
  const [expandedServos, setExpandedServos] = useState<string[]>([])

  useEffect(() => {
  }, [props.ProjectStore.rig])

  function addCard() {
    let servo = new ServoModel({
      id: uuidv1(),
    });
    let rig = [...props.ProjectStore.getRig(), servo];
    props.ProjectStore.setRig(rig)
  }

  function removeCard(id: string) {
    let localServos = [...props.ProjectStore.getRig()];
    let index = localServos.findIndex(servo => servo.id === id);
    localServos.splice(index, 1);
    props.ProjectStore.setRig(localServos);
  }

  function setTitle(id: string, val: string) {
    let localServos = [...props.ProjectStore.getRig()];
    let index = localServos.findIndex(servo => servo.id === id);
    localServos[index].title = val;
    props.ProjectStore.setRig(localServos);
  }

  function setAddress(id: string, val: string) {
    let localServos = [...props.ProjectStore.getRig()];
    let index = localServos.findIndex(servo => servo.id === id);
    localServos[index].address = val;
    props.ProjectStore.setRig(localServos);
  }

  function setPin(id: string, val: number) {
    let localServos = [...props.ProjectStore.getRig()];
    let index = localServos.findIndex(servo => servo.id === id);
    localServos[index].pin = val;
    props.ProjectStore.setRig(localServos);
  }

  function setMin(id: string, val: number) {
    let localServos = [...props.ProjectStore.getRig()];
    let changed = localServos.find(x => x.id === id);
    if (changed == null) return;
    changed.min = val;
    props.ProjectStore.setRig(localServos);
    ServoManager.Instance.moveToPosition(changed, val);
  }

  function setMax(id: string, val: number) {
    let localServos = [...props.ProjectStore.getRig()];
    let changed = localServos.find(x => x.id === id);
    if (changed == null) return;
    changed.max = val;
    props.ProjectStore.setRig(localServos);
    ServoManager.Instance.moveToPosition(changed, val);
  }

  function setDefaultPosition(id: string, val: number) {
    let localServos = [...props.ProjectStore.getRig()];
    let changed = localServos.find(x => x.id === id);
    if (changed == null) return;
    changed.defaultPos = val;
    props.ProjectStore.setRig(localServos);
    ServoManager.Instance.moveToPosition(changed, val);
  }

  function toggleExpanded(id: string) {
    let index = expandedServos.findIndex(x => x === id);
    if (index === -1) {
      setExpandedServos([...expandedServos, id]);
    } else {
      let arr = [...expandedServos];
      arr.splice(index, 1);
      setExpandedServos(arr);
    }
  }

  function setPosition(id: string, data: DraggableData) {
    let { x, y } = data;
    let localServos = [...props.ProjectStore.getRig()];
    let index = localServos.findIndex(x => x.id === id);
    localServos[index].htmlPosX = Number(x);
    localServos[index].htmlPosY = Number(y);
    props.ProjectStore.setRig(localServos);
  }

  async function loadFile(a: any) {
    try {
      let file = a.target.files[0];
      if (!file) { SnackbarManager.Instance.addError('Could not load file'); }
      let strArr = await parseTextFile(a.target.files[0]);
      let obj: RigData = JSON.parse(strArr[0]);
      props.ProjectStore.setRig(obj.servos);
    } catch (error) {
      console.log(error);
      SnackbarManager.Instance.addError('Error thrown during upload process, see console');
    }
  }


  return (
    <Grid container>
      <Header addCard={addCard} load={loadFile} {...props} />
      {props.ProjectStore.getRig().map(servo => {
        return (
          <Draggable
            position={{ x: servo.htmlPosX, y: servo.htmlPosY }}
            key={servo.id}
            onStop={(e, data) => setPosition(servo.id, data)} cancel=".CardContent"
          >
            <Card style={{ position: 'absolute', zIndex: window.screen.height - servo.htmlPosY, width: '300px', height: '200px' }} className="rigCard" >
              <CardHeader className="unselectableText"
                title={servo.title}
                action={<Button onClick={() => removeCard(servo.id)}>X</Button>}
              />
              <CardContent className="CardContent" >
                <ExpansionPanel expanded={expandedServos.findIndex(x => x === servo.id) !== -1} onChange={() => toggleExpanded(servo.id)}>
                  <ExpansionPanelSummary
                    expandIcon={<i className="fa fa-chevron-down"></i>}
                  >
                    <Typography>Servo input fields</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction="column" justify="space-between">
                      <Grid item>
                        <TextField
                          label="Title"
                          value={servo.title}
                          variant="filled"
                          onChange={e => setTitle(servo.id, e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Address"
                          value={servo.address}
                          variant="filled"
                          onChange={e => setAddress(servo.id, e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Pin"
                          value={servo.pin}
                          variant="filled"
                          onChange={e => setPin(servo.id, Number(e.target.value))}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Min"
                          value={servo.min}
                          variant="filled"
                          onChange={e => setMin(servo.id, Number(e.target.value))}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Max"
                          value={servo.max}
                          variant="filled"
                          onChange={e => setMax(servo.id, Number(e.target.value))}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Default position"
                          value={servo.defaultPos}
                          variant="filled"
                          onChange={e => setDefaultPosition(servo.id, Number(e.target.value))}
                        />
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </CardContent>
            </Card>
          </Draggable>
        )
      })}
    </Grid>)
}


const setupRig = inject('ProjectStore')(observer(SetupRig))
export default setupRig;