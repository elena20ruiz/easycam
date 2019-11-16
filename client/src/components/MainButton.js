import React from 'react';
import { withStyles, CircularProgress } from '@material-ui/core';
import { Button } from "@material-ui/core";


const useStyle = theme => ({
    primary: {
        backgroundColor: '#4582B6',
        width: '-webkit-fill-available',
        position: 'fixed',
        bottom: '0',
        color: 'white',
        fontSize: '8vw',
        padding: '1vh',
        borderRadius: '0'
    }
});


class MainButton extends React.Component {

    render(){
        return   (
            <Button className={this.props.classes.primary} onClick={this.props.onClick}>
                {this.props.text}
                {
                    this.props.loading && <CircularProgress/>
                }
            </Button>
        )
    }
}

export default withStyles(useStyle)(MainButton) 