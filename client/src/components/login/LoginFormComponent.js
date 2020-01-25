import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Button,
  TextField,
  Avatar,
  Typography
} from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
//import green from '@material-ui/core/colors/green'
import validator from 'validator'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: "100%"
    }
  },
  container: {
    padding: 30,
    textAlign: 'center'
  },
  textField: {
    width: '100%',
    margin: 10
  },
  signInBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    minWidth: 300,
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f5f5f5',
    fontWeight: 600,
    width: '100%',
    margin: 10
  }
}))

const SERVICE_MAP = [
  "Facebook",
  "Linkedin",
  "Google"
]

export default function LoginFormComponent(props) {
  const classes = useStyles()
  const [username, setUsername] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [auth, setAuth] = React.useState(false)
  const [token, setToken] = React.useState(null)

  const handleUsernameChange = event => {
    setUsername(event.target.value)
    /*if (!validator.isLength(username, { min: 6 })) {
      messages.push("* Password length should be at least 6 characters.")
    } else {
      messages.pop()
    }*/
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
    /*if (!validator.isEmail(password)) {
      messages.push("* Username is incorrect.")
    } else {
      messages.pop()
    }*/
  }

  const handleServiceClick = event => {
    window.location.href = "/api/auth/" + event.target.name.toLowerCase()
  }

  const handleOnSubmit = e => {
    if (!auth) {
      fetch('/auth/local/login', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
        .then(res => res.json())
        .then(result => {
          console.log(`${JSON.stringify(result)}`)
          setAuth(result.auth)
          setToken(result.token)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <Grid container justify="center" >
      <Grid item className={classes.container}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {
            SERVICE_MAP.map((service, index) =>
              <TextField
                className={classes.button}
                color="secondary"
                key={index}
                value={service}
                name={service}
                variant="outlined"
                type="button"
                onClick={handleServiceClick}
              >
              </TextField>
            )}
            <TextField className={classes.textField} id="username" name="username" label="Username" variant="outlined" type="text" onChange={handleUsernameChange} />
            <TextField className={classes.textField} id="password" name="password" label="Password" variant="outlined" type="password" onChange={handlePasswordChange} />
            <Button variant="outlined" type="submit" size="large" color="primary" onClick={handleOnSubmit}>
              Login
            </Button>
        </div>
      </Grid>
    </Grid>
  )
}
