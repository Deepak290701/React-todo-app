import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl ,Button, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from "firebase";

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  // const [timestamp,setTimestamp] = useState('');
  // console.log(input);
  // console.log(todos);

  // this is called whent the app loads or the input is entered
  useEffect( () => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      // it takes snapshot of the database and kind makes a document of it and map is iteration through 
      // each and every element of the db and as it will return the json type of format therefore, we will 
      // have to use data().todo
      // console.log(timestamp)
      setTodos(snapshot.docs.map(doc => (
          { id : doc.id , 
            todo : doc.data().todo ,
            timestamp:doc.data().timestamp })
         ))
    }) 
  },[]);

  const addTodo = (event) => {
    event.preventDefault();
    console.log("👽" ,"Hello ji mai chal gya");

    db.collection('todos').add({
      todo: input,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp()    
      timestamp:Date().toLocaleString()
    })
    // setTodos([...todos,input])
    setInput('');
    // setTimestamp(firebase.firestore.FieldValue.serverTimestamp())
  }

  const clearAll = (event) => {
    event.preventDefault();
    console.log("😡","Run kyu ho rha hai")

    // const ref = db.collection('todos')

    // db.collection("todos").onSnapshot(snapshot => {
    //     snapshot.docs.forEach(doc => {
    //         ref.doc(doc.id).delete()
    //         .catch(error => {
    //             console.log(error)
    //         })
    //     })
    // })

      db.collection("todos")
    .get()
    .then(res => {
      res.forEach(element => {
        element.ref.delete();
      });
    });


    setTodos([]);
    console.log("🤷‍♀️",todos);
    // console.log(Button);
  }


  

  return (
    <div className="App">
      <h1>Todo List!!!</h1>
      <form action="">
        <FormControl>
          <InputLabel >Enter Your Task...</InputLabel>
          <Input  value = {input} onChange = {event => setInput(event.target.value)} />
        </FormControl>
        <Button className = "add-btn" disabled = {!input} variant="contained" color="primary" type = "submit" onClick = {addTodo}>Add</Button>
      </form>
      
      <Button className = "clearAll-btn" variant="contained" color="secondary" type = "submit" onClick = {clearAll}>Clear All</Button>
      
      <ul className="todo-ullist">
          {

            todos.map(todo => (
              <Todo todo = {todo} />
            ))
          }
      </ul>
      
    </div>
  );
}

export default App;
