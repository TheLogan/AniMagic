import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Grid, Tooltip } from "@material-ui/core";
import './Main.css'
import { inject, observer } from "mobx-react";
import { ProjectStore } from "../../../Mobx/ProjectStore";
import { ServoManager } from "../../../Helpers/ServoManager";


interface IProps extends RouteComponentProps { ProjectStore: ProjectStore }

function Main(props: IProps) {
    const [projectName, setProjectName] = useState('');
    useEffect(() => {
        setProjectName(props.ProjectStore.projectName || 'No project loaded ')
    }, [props.ProjectStore.projectName])

    function getBlendshapeTooltip() {
        if (props.ProjectStore.projectExists === false) return "Project must be loaded";
        if (props.ProjectStore.rig == null || props.ProjectStore.rig.length < 1) return "Must have rig to create blendshapes";
        return "";
    }

    return (
        <Grid container direction="column" alignItems="center" justify="center" className="fullHeight">
            <h1>{projectName}</h1>
            <Grid item>
                <Button color="primary" onClick={() => props.history.push('/createproject')}>Create new project</Button>
            </Grid>
            <Grid item>
                <Button color="primary" onClick={() => props.history.push('/loadproject')} >Load existing project</Button>
            </Grid>
            <Tooltip title={props.ProjectStore.projectExists === false ? "Project must be loaded" : ""} placement="left" arrow>
                <Grid item>
                    <Button color="primary" onClick={() => props.history.push('/setuprig')} disabled={props.ProjectStore.projectExists === false}>setup rig</Button>
                </Grid>
            </Tooltip>
            <Tooltip title={getBlendshapeTooltip()} placement="left" arrow>
                <Grid item>
                    <Button color="primary" onClick={() => props.history.push('/editblendshapes')} disabled={getBlendshapeTooltip() !== ""}>Blendshapes</Button>
                </Grid>
            </Tooltip>
            <Button onClick={() => ServoManager.Instance.createNewBoard()}>Connect board</Button>
        </Grid>)
}

const MainMenu = inject('ProjectStore')(observer(Main))
export default MainMenu;