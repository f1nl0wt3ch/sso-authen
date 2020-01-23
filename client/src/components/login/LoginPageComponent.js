import React from 'react'
import LoginFormComponent from './LoginFormComponent'
import { makeStyles } from '@material-ui/core/styles'
import FooterComponent from '../FooterComponent'
import NavigationComponent from '../NavigationComponent'

const useStyles = makeStyles(theme => ({
   root: {
      minHeight: '100%'
   }
}))

export default (props) => {
   const classes = useStyles()
   return (
      <div className={classes.root}>
         <NavigationComponent />
         <LoginFormComponent />
         <FooterComponent />
      </div>
   )
}
