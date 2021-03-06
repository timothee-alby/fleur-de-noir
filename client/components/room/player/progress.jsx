import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0.5) * -1
  }
}))

const RoomPlayer = ({ isNext, isChallenger, outcome }) => {
  const classes = useStyles()

  if (outcome) return null
  if (!isNext && !isChallenger) return null

  return <LinearProgress className={classes.root} />
}

export default RoomPlayer
