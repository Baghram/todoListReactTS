import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const typeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const typePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Axios({
      url: 'http://localhost:3001/register',
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('Token'),
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((result) => {
        console.log(`Success!!`);
        console.log(result.data);
        setRegister(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //after register redirect to login page
  if (register) {
    return <Redirect to="/login"></Redirect>;
  }

  return (
    <>
      <div className="LoginScreen">
        <div className="loginBox">
          <h1>Register</h1>
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

export default Register;
