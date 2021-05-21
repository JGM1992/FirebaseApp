import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '100%',
        },
    },
    paper1: {
      borderRadius: '3%',
      padding: '10%',
      height: '100%',
      width: '100%',
      margin: '5% auto'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '5% auto'
  },
  grid: {
    backgroundColor: '#4b73f0',
    color: '#ffffff',
    textAlign: 'center'
  }, 
  input: {
    width: '100%'
  }
}));