import React from 'react';
import Grid from '@material-ui/core/Grid';
import MainButton from '../components/MainButton.js';
import constant from '../constants.js';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core';
import { equal } from 'assert';

const useStyle = (theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

class Connect extends React.Component {

    constructor(props) {
        super(props);

        this.elements = constant.STEPS[props.info.device];

        var elementsValue = []
        for (var i in this.elements) {
            elementsValue.push(0);
        }

        this.state = {
            elementsValue: elementsValue,
            loading: false,
            error: false
        }

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        var t = parseInt(e.target.value);

        const {elementsValue} = this.state;
        elementsValue[t]=!elementsValue[t];
        this.setState({
            elementsValue: elementsValue
        })
    }


    handleClick() {
        const allEqual = !!this.state.elementsValue.reduce(function(a, b){ return (a === b) ? a : NaN; });
        if(allEqual && this.state.elementsValue[0] === true){
            
            //LOADING
            this.setState({
                loading: true,
                error:false
            })
            //Connect

            // this.props.onClick();
        }
        else {
            this.setState({
                error: true
            })
        }
    }

    renderElements() {
        var checkboxes = []
        for (var i in this.elements) {
            checkboxes.push(
                <FormControlLabel
                    control={<Checkbox checked={this.state.elementsValue[i]} onChange={(e) => this.handleChange(e)} value={i} />}
                    label={this.elements[i]}
                />
            )
        }
        return checkboxes;
    }

    renderCheckboxes() {
        return (
            <FormControl component="fieldset" error={this.state.error} className={this.props.classes.formControl}>
                <FormLabel component="legend">{constant.STEPS_TITLE}</FormLabel>
                <FormGroup>
                    {this.renderElements()}
                </FormGroup>
                {
                    this.state.error &&
                    <FormHelperText>Remember complete all the steps and the check it.</FormHelperText>
                }
            </FormControl>
        )
    }

    render() {

        var text = '';
        if(!this.state.loading) {
            text=constant.BUTTON.connect;
        }

        return (
            <Grid container
                directon="column"
                
            >
                <Grid item xs={12}>
                    {this.renderCheckboxes()}
                </Grid>

                <Grid item xs={12}>
                    <MainButton text={text} onClick={(e)=>{this.handleClick(e)}} loading={this.state.loading} />
                </Grid>
            </Grid>
        )
    }
}



export default withStyles(useStyle)(Connect);