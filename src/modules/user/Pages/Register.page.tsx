import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
// import Axios from 'axios';

const Register = () => {
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
    // Axios({
    //   url: 'http://localhost:3000/login',
    //   method: 'POST',
    //   headers: {
    //     Authorization: localStorage.getItem('Token'),
    //   },
    // })
    //   .then((result) => {
    //     console.log(`Success!!`);
    //     console.log(result.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log(email);
    console.log(password);
  };
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

export default Register;
