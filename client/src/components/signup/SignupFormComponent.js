import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import validator from 'validator'


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorTypography: {
    marginTop: theme.spacing(1),
    fontWeight: 800
  }
}))

export default function SignupFormComponent() {
  const classes = useStyles()

  const [firstName, setFirstName] = React.useState(""),
    [errorFirstName, setErrorFirstName] = React.useState(null),
    [lastName, setLastName] = React.useState(""),
    [errorLastName, setErrorLastName] = React.useState(null),
    [email, setEmail] = React.useState(""),
    [errorEmail, setErrorEmail] = React.useState(null),
    [password, setPassword] = React.useState(""),
    [errorPassword, setErrorPassword] = React.useState(null),
    [message, setMassage] = React.useState(""),
    [success, setSuccess] = React.useState(false)

  const handleSubmitClick = () => {
    if (!errorFirstName & !errorLastName & !errorEmail & !errorPassword) {
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, password })
      })
        .then(res => res.json())
        .then(({ success, message }) => {
          setMassage(message)
          if (success) setSuccess(success)
        })
        .catch(err => console.log(err))
    }
  }

  const validateTextField = (e, type) => {
    switch (type) {
      case 'email':
        return validator.isEmail(e.target.value)
      case 'name':
        return validator.isAlpha(e.target.value, ['en-US'])
      case 'password':
        return validator.isLength(e.target.value, { min: 6 })
      default:
        return null
    }
  }

  const handleTextFieldChange = event => {
    switch (event.target.name) {
      case 'firstName':
        setFirstName(event.target.value)
        if (validateTextField(event, 'name')) {
          setErrorFirstName(null)
        } else {
          setErrorFirstName("* Firstname should be alphabe characters and cannot empty.")
        }
        break
      case 'lastName':
        setLastName(event.target.value)
        if (validateTextField(event, 'name')) {
          setErrorLastName(null)
        } else {
          setErrorLastName("* Firstname should be alphabe characters and cannot empty.")
        }
        break
      case 'email':
        setEmail(event.target.value.toLowerCase())
        if (validateTextField(event, 'email')) {
          setErrorEmail(null)
        } else {
          setErrorEmail("* Email is incorrect and cannot empty.")
        }
        break
      case 'password':
        setPassword(event.target.value)
        if (validateTextField(event, 'password')) {
          setErrorPassword(null)
        } else {
          setErrorPassword("* Password length must be at least 6 characters.")
        }
        break
      default:
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Typography component="h1" variant="h5" color={!success ? "error" : "primary"}>
          {message}
        </Typography>
        {
          (success) ? ("") : (
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={handleTextFieldChange}
                  />
                  {!errorFirstName ? ("") : (
                    <Typography variant="subtitle2" color="error" className={classes.errorTypography}>
                      {errorFirstName}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={lastName}
                    onChange={handleTextFieldChange}
                    autoFocus
                  />
                  {!errorLastName ? ("") : (
                    <Typography variant="subtitle2" color="error" className={classes.errorTypography}>
                      {errorLastName}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleTextFieldChange}
                  />
                  {!errorEmail ? ("") : (
                    <Typography variant="subtitle2" color="error" className={classes.errorTypography}>
                      {errorEmail}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleTextFieldChange}
                  />
                  {!errorPassword ? ("") : (
                    <Typography variant="subtitle2" color="error" className={classes.errorTypography}>
                      {errorPassword}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmitClick}
              >
                Sign Up
            </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
              </Grid>
            </form>
          )
        }
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  )
}
