import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TextField, Grid, Button } from '@material-ui/core';

interface IProps extends RouteComponentProps { }

export function EditAnimation(props: IProps) {
    const [title, setTitle] = useState('');

    function renderNodePicker() {
        return <div>nodepicker</div>
    }

    return <div>
        <Grid container spacing={3}>
            <Grid item xs={3}>
                {renderNodePicker()}
                <Button onClick={() => props.history.push('/newclip')}>Create new Clip</Button>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    fullWidth
                />
            </Grid>
        </Grid>
    </div>
}