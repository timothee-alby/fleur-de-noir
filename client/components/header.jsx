import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from './auth'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.header.main,
    color: theme.palette.background.header.gradient
  },
  toolbar: {
    color: theme.palette.common.white
  },
  title: {
    marginRight: theme.spacing(3)
  },
  userName: {
    marginLeft: 'auto'
  }
}))

const HeaderWrapper = WrappedComponent => props => {
  const classes = useStyles()
  const { userName } = useAuth()

  return (
    <AppBar
      position="static"
      className={classes.root + ' pattern-cross-dots-sm'}
    >
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        {WrappedComponent && <WrappedComponent {...props} />}
        <Typography variant="h6" className={classes.userName}>
          {userName}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderWrapper
