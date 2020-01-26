import React from 'react'
import {
  makeStyles 
} from '@material-ui/core'
import FooterComponent from '../FooterComponent'
import NavigationComponen from '../NavigationComponent'

const useStyles = makeStyles(theme =>({
   root: {
      height: '100%'
   }
}))
export default (props) => {
    const classes = useStyles()
    return (
      <div className={classes.root}>
         <NavigationComponen />
         {"this is dashboard"}
         <FooterComponent />
      </div>
    )
}
