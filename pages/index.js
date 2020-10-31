import React from 'react'
import makeStyles  from '@material-ui/styles/makeStyles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { increment, decrement } from '../src/actions'
import {bindActionCreators} from "redux";
import Button from "@material-ui/core/Button";
import {push} from "connected-next-router";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 14
  }
})

const Index = (props) => {
  const {
    value,
      from,
      action
  } = props.counter
const {
  increment:inc,
  decrement:dec,
    push
}=props.actions
  const classes = useStyles()
  return (
  <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Dispatched from <b>{from}</b>
        </Typography>
        <Typography variant='h3' component='h2'>
          {value}
        </Typography>
        <Typography color='textSecondary'>{action}</Typography>
      </CardContent>
    <Button onClick={()=>push("routeExample")}>Click me</Button>
      <CardActions>
        <Fab
          variant='round'
          color='primary'
          size='small'
          onClick={() => inc()}
        >
          <AddIcon />
        </Fab>
        <Fab
          variant='round'
          color='secondary'
          size='small'
          onClick={() => dec()}
        >
          <RemoveIcon />
        </Fab>
      </CardActions>
    </Card>
  )
}
// only required to make changes on the server side, can be removed
// Index.getInitialProps = ({ store, isServer }) => {
//   store.dispatch({
//     type: INCREMENT,
//     from: isServer ? 'server' : 'client'
//   })
//
//   return { isServer }
// }


export default connect(
  state=>{
    return {...state}
  },
    (dispatch=>({actions:bindActionCreators({increment,decrement,push},dispatch)}))
)(Index)
