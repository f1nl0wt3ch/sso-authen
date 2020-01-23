import React from 'react'
import { Grid } from '@material-ui/core';
import LeftPanelComponent from './LeftPanelComponent'
import RightPanelComponent from './RightPanelComponent'

export default props =>
    <Grid container sm>
          <LeftPanelComponent />
          <RightPanelComponent />
    </Grid>
