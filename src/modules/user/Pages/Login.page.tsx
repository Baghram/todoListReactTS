import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const typeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const typePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Axios({
      url: 'http://localhost:3001/login',
      method: 'POST',
      data: {
        username: email,
        password: password,
      },
    })
      .then((result) => {
        console.log(`Success!!`);
        if (result.data.Token) {
          localStorage.setItem('Token', result.data.Token);
          setLoggedIn(true);
        }
        if (result.data.message === 'Login Failed') {
          setLoggedIn(false);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  //useEffect for checking logged in or not
  useEffect(() => {
    if (localStorage.getItem('Token')) {
      setLoggedIn(true);
    }
  }, []);

  if (loggedIn) {
    return <Redirect to="/todos"></Redirect>;
  }

  return (
    <>
      <div className="LoginScreen">
        <div className="loginBox">
          <h1>Login</h1>
          <Form onSubmit={submit}>
            <FormGroup>
              <Label for="Email">Email</Label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={typeEmail}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={typePassword}
                required
              />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
