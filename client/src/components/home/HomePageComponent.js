import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import NavigationComponent from '../NavigationComponent'
import FooterComponent from '../FooterComponent'
import LoginFormComponent from '../login/LoginFormComponent'

const useStyles = makeStyles(theme => ({
   root: {
      minHeight: '100%'
   }
}))

export default (props) => {
   const classes = useStyles()

   /* 
   Doi voi function component thi viec pass 
   object hoac function tu parent sang children 
   phai thuc hien bang cach khai bien nhu vi du 
   duoi day voi navigation component
   */

   return (
      <div className={classes.root}>
         <NavigationComponent />
         <LoginFormComponent />
         <FooterComponent />
      </div>
   )
}
