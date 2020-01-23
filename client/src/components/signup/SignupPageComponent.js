import React from 'react'
import SignupFormComponent from './SignupFormComponent'
import { makeStyles } from '@material-ui/core/styles'
import NavigationComponent from '../NavigationComponent'
import FooterComponent from '../FooterComponent'

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
         <SignupFormComponent />
         <FooterComponent />
      </div>
   )
}