import React from 'react';
import Grid from '@material-ui/core/Grid';
import constant from '../constants';
import Device from './Device';
import Connect from './Connect';



class EasyCam extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            step: 0,
            info: undefined
        }
    }

    changeStep(info){
        if(!info) return;
        switch(this.state.step) {
            case 0:
                // Get DEVICE
                if(!'device' in info) throw Error('New device info');
                else {
                    if(info.device in constant.STEPS){
                        // Change to next info 
                        this.setState({
                            info: info,
                            step: 1
                        })
                    }
                }
                break;
            case 1:
                break;
        }
    }


    renderStep() {

        switch(this.state.step) {
            case 0:
                return <Device onClick={(info) => this.changeStep(info)}/>
            case 1:
                return <Connect info={this.state.info} onClick={(info) => this.changeStep(info)}/>
            case 2: 
                return <div>Pre IMPORT</div>
        }
    }


    render() {

        var step = this.renderStep();

        return (
            <Grid item 
                  xs={12}>
                      {step}
            </Grid>
        )
    }
}



export default EasyCam;