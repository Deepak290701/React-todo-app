import React, { useState } from 'react'
import {List, ListItem, ImageIcon, ListItemText, ListItemAvatar, Avatar, Button, Modal} from '@material-ui/core';
import './Todo.css';
import db from './firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { green, pink } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    green: {
        display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
          color: '#fff',
          backgroundColor: green[500],
    },
    modalDiv: {
        maxWidth: 500,
    },
  }));

//   const useStyles2 = makeStyles((theme) => ({
//     green: {
//     display: 'flex',
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//       color: '#fff',
//       backgroundColor: green[500],
//     },
//   }));
  


function Todo(props) {
    const [open,setOpen] = useState(false);
    const [input,setInput] = useState('');

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo:input
        },{merge: true})
        setOpen(false);
        setInput(' ');
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                className = "modal"
            >
            <div className={classes.paper}>
                {/* <form action=""> */}
                    <h2>Enter the updated text!!!</h2>
                    <input class = "update-inpt" placeholder = "Enter the text here..." value ={input} onChange = {event => setInput(event.target.value)} />
                    <Button className ="update-btn" onClick = {updateTodo}>Update</Button>
                {/* </form> */}
            </div>
            </Modal>
            <List className = "todo_list">
                <ListItem >
                    <ListItemAvatar>
                    {/* <Avatar>
                    </Avatar> */}
                    <Avatar className={classes.green}>
                        <AssignmentIcon />
                    </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={props.todo.todo} secondary = {"Time - "+JSON.stringify(props.todo.timestamp)} />
                </ListItem>
                <EditIcon className = "edit-todo" onClick = {e => setOpen(true)}/>
                <DeleteIcon className="deleteicon" onClick = {event => db.collection('todos').doc(props.todo.id).delete()} />

            </List>
        </>
    )
}

export default Todo
