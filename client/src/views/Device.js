
import React from 'react';
import { withStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';


import constant from '../constants.js';
import MainButton from '../components/MainButton.js';

const useStyle = theme => ({
    form: {
        margin: '1em'
    }
});




class Device extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            device: undefined
        }
        this.devices = constant.DEVICES;

        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        var index =  e.target.value
        this.setState({
            device:  index
        })
    }

    handleClick() {
        this.props.onClick({'device': this.state.device});
    }

    render() {
        return (
            <Grid container
                directon="column"
            >
                <Grid item xs={12} className={this.props.classes.form}>
                    <p>Please, indicate the device to import the media:</p>
                </Grid>
                <Grid item xs={12} className={this.props.classes.form}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Device</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.device}
                            onChange={(e) => this.handleChange(e)}
                        >
                            <MenuItem value={'xiaomi'}>{this.devices.xiaomi}</MenuItem>
                            <MenuItem value={'micro'}>{this.devices.micro}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <MainButton text={constant.BUTTON.start} onClick={()=> this.handleClick()}/>
                </Grid>
            </Grid>
        )
    }
}


export default withStyles(useStyle)( Device);