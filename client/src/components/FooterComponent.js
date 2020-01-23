import React from 'react'
import {
   Typography,
   Link,
   AppBar,
   Toolbar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

const getFullYear = () => {
   let now = new Date()
   return now.getFullYear() + '.'
}

const useStyles = makeStyles(theme => ({
   root: {
      height: 80,
      bottom: 0,
      backgroundColor: '#f5f5f5',
      border: '1px solid #f5f5f5'
   },
   toolbar: {
      margin: 'auto',
      justifyContent: 'center'
   },
   typography: {
      margin: 'auto'
   },
   link: {
      color: green[800],
      fontWeight: 700,
      justifyContent: 'center',
      verticalAlign: 'middle'
   }
}))
export default (props) => {
   const classes = useStyles()
   const [currentYear] = React.useState(getFullYear())
   return (
         <AppBar position="static" className={classes.root}>
            <Toolbar>
            <Typography color="textSecondary" className={classes.typography}>
               {'copyright © '}
               <Link className={classes.link} href="http://tikkidinh.com">
                  Tikki Dinh
            </Link>{' '}
               {currentYear}
            </Typography>
            </Toolbar>
         </AppBar>
   )
}