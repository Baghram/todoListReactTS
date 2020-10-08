import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import Axios from 'axios';

const Login = () => {
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
        localStorage.setItem('Token', result.data.Token)
        console.log(result.data);
      })
      .catch((err: any) => {
        console.log(err);
      });

    console.log(email);
    console.log(password);
  };
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
