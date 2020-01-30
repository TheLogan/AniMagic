import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, RouteComponentProps } from "react-router-dom";
import { Main } from "./Components/Routes/Main";
import { EditAnimation } from "./Components/Routes/EditAnimation";

interface IProps extends RouteComponentProps { }

function App(props: IProps) {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/newclip" />
        <Route path="/newanimation" component={EditAnimation} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
