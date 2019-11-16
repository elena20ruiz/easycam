import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';


// Components
import Header from './components/Header';
import EasyCam from './views/EasyCam';

export default () => (
  <Grid container 
        direction='column'
        spacing={0}>
    <Header/>
    <EasyCam/>
  </Grid>
);
