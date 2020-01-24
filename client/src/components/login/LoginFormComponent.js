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
  const [errorUsername, setErrorUsername] = React.useState(null)
  const [errorPassword, setErrorPassword] = React.useState(null)
  const [login, setLogin] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const handleUsernameChange = event => {
    setUsername(event.target.value)
    if (!validator.isEmail(event.target.value)) {
      setErrorUsername("* Username is incorrect.")
    } else {
      setErrorUsername(null)
    }
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
    if (!validator.isLength(event.target.value, { min: 6 })) {
      setErrorPassword("* Password length should be at least 6 characters.")
    } else {
      setErrorPassword(null)
    }
  }

  const handleServiceClick = event => {
    window.location.href = "/api/auth/"+event.target.name.toLowerCase()
}

const handleLoginClick = e => {
  e.preventDefault()
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
      console.log(`Login result: ${result}`)
      setMessage(result.message)
      if (result.success) {
        setLogin(true)
      }
    })
    .catch(err => console.log(err))
}

return (
  <React.Fragment >
    {login ?
      (<Typography variant="h5" align="center" color="primary">
        {message}
      </Typography>) : (
        <Grid container justify="center" >
          <Grid item className={classes.container}>
            <form autoComplete="off" action="/auth/local/login" method="POST">
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
                {
                  (!errorUsername) ? ("") : (
                    <Typography color="error" variant="subtitle1" align="left">
                      {errorUsername}
                    </Typography>
                  )
                }
                <TextField className={classes.textField} id="password" name="password" label="Password" variant="outlined" type="password" onChange={handlePasswordChange} />
                {
                  (!errorPassword) ? ("") : (
                    <Typography color="error" variant="subtitle1" align="left">
                      {errorPassword}
                    </Typography>
                  )
                }
                <Typography variant="subtitle1" align="center" color="error">
                  {message}
                </Typography>
                <Button variant="outlined" size="large" color="primary" onClick={handleLoginClick}>
                  Login
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      )}
  </React.Fragment>)
}
