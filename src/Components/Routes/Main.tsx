import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "@material-ui/core";

interface IProps extends RouteComponentProps {

}
export function Main(props: IProps) {

    function createNewAnimation() {
        props.history.push('newanimation');
    }

    return <div>
        <Button onClick={createNewAnimation}>New</Button>
        <Button>Load</Button>
    </div>
}