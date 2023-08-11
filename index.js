import express from "express";
import axios from 'axios'
const app= express();

const users = [
    { username: 'pepe', password: 'pepa' },
  ];
  
  app.post('/login', (req, res) => {
    console.log(req);
    const { Username, Password } = req.body;
    const user = users.find((user) => user.username === username);
  
    if (user.Username !== username || user.Password !== password) {
      return res.status(401).send({ error: 'usuarios incorrectos, AHHHHHHHHH!!' });
    }
  
    res.send({ message: 'entramos chavales!!!' });
  });
  
  const port = 5000;
  app.listen(port,() =>{
    console.log("listening on port:", port);
  })

