import React, { Component } from 'react';
import { Snackbar, Slide, Card, CardContent } from '@material-ui/core';
import './SnackbarManager.css';

interface IProps { }
interface IState {
  message: string;
  open: boolean;
  severity: 'error' | 'success';
}

function SlideTransition(props: any) {
  return <Slide {...props} direction="left" />;
}

export class SnackbarManager extends Component<IProps, IState> {
  public static Instance: SnackbarManager;

  constructor(props: IProps) {
    super(props);
    SnackbarManager.Instance = this;

    this.state = {
      message: '',
      open: false,
      severity: 'success'
    }
  }

  addSuccess(message: string) {
    this.setState({
      message,
      open: true,
      severity: 'success'
    })
  }

  addError(message: string) {
    this.setState({
      message,
      open: true,
      severity: 'error'
    })
  }

  render() {
    return <Snackbar
      open={this.state.open}
      onClose={() => this.setState({ open: false })}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Card
        className={'snackbar ' + this.state.severity}
      >
        <CardContent>
          {this.state.message}
        </CardContent>
      </Card>
    </Snackbar>
  }
}