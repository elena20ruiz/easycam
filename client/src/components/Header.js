import React from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


import logo from "../images/easycam.svg";

const useStyle = theme => ({
    header: {
        backgroundColor: 'white',
        boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.16)',
        margin: 0,
        height: '10vh',
        alignContent: 'center',
        display: 'flex',
        justifyContent: 'center'
    }
});


class Header extends React.Component {
    render() {
        return (
            <Grid item
                xs={12}

            >
                <div
                    className={this.props.classes.header}
                >
                    <img src={logo}></img>
                </div>

            </Grid>
        )
    }
}


export default withStyles(useStyle)(Header)