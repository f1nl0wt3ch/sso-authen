import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
  Link
} from '@material-ui/core'
import {
  blueGrey
} from '@material-ui/core/colors'
const MENUS = [
  {
    'name': 'SSO AUTHENTICATION',
    'component': '/'
  },
  {
    'name': 'Dashboard',
    'component': '/dashboard'
  },
  {
    'name': 'Signup',
    'component': '/signup'
  }
]

const useStyles = makeStyles(theme => ({
  appBar: {
    display: 'flex',
    padding: 15
  },
  toolbarBtn: {
    flexGrow: 1,
    justifyContent: 'left',
    paddingRight: 15
  },
  menuBtn: {
    margin: theme.spacing(1, 1.5)
  },
  button: {
    size: 25
  },
  link: {
    textAlign: 'left',
    color: blueGrey[400],
    textDecoration: 'none',
    "&:hover": {
      textDecoration: 'none',
      fontWeight: 'bold',
      color: blueGrey[800]
    }
  }
}))

export default (props) => {
  const classes = useStyles()

  return (
    <AppBar color="default" position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" color="textSecondary" className={classes.toolbarBtn}>
          <Link className={classes.link} href={MENUS[0].component}>{MENUS[0].name}</Link>
        </Typography>
        {
          MENUS.filter((menu, index) => index >= 1).map((menu, index) =>

            <Button
              variant="contained"
              key={index}
              className={classes.menuBtn}
              href={menu.component}
            >
              <Typography variant="subtitle1" color="secondary">{menu.name}</Typography>
            </Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}
