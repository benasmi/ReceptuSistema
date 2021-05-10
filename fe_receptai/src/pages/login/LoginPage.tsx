import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { tokenStored } from '../../utils';
import { RootState } from '../../app/store';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export interface ILoginRequest {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loginConfig, setLoginConfig] = useState<ILoginRequest>({ email: '', password: '' });

  const {isAuthenticated} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setLoginConfig(oldVal => {
      return {
        ...oldVal,
        [name]: value
      };
    });
  }

  if (tokenStored() || isAuthenticated) {
    return <Redirect to='/app/home' />;
  }

  return (
    <Container className='d-flex h-100'>
      <Row className='align-self-center w-100 mt-5'>
        <Col className='mx-auto'>
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control as='input' type='email' placeholder='Enter email' name='email' value={loginConfig.email} onChange={handleChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control as='input' type='password'  placeholder='Enter password' name='password' value={loginConfig.password} onChange={handleChange}>
              </Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit' onClick={() => {
                dispatch(login(loginConfig))
                setLoginConfig({...loginConfig, password: ''})
              }}>
              Login
            </Button>{' '}
            <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </Container>
    
    // <div className='loginDiv'>
    //   <input id='credentialField' type='text' name='email' placeholder='Username' value={loginConfig.email}
    //          onChange={handleChange} />{' '}
    //   <input
    //     id='credentialField'
    //     type='password'
    //     name='password'
    //     placeholder='Password'
    //     value={loginConfig.password}
    //     onChange={handleChange}
    //   />
    //   <button type='submit' onClick={() => dispatch(login(loginConfig))}>
    //     Login
    //   </button>
    // </div>
  );
};
