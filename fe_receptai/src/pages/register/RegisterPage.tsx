import { Formik } from 'formik'
import React from 'react'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { RootState } from '../../app/store';
import { signUp } from '../../features/auth/authSlice';
import { tokenStored } from '../../utils';
import './style.css';
export interface IRegisterRequest {
    email: string;
    name: string;
    password: string;
}

export default function RegisterPage() {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state: RootState) => state.auth)

    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required!'),
        name: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too Long!')
            .required('Required!'),
        password: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too Long!')
            .required('Required'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    function registerUser(registerData: IRegisterRequest) {
        dispatch(signUp(registerData))
    }

    if (tokenStored() || isAuthenticated) {
        return <Redirect to='/app/home' />;
    }

    return (
        <Container className='d-flex h-100'>
            <Row className='align-self-center w-100 mt-5'>
                <Col className='mx-auto'>
                    <h1 className='text-center mb-3'>Register</h1>
                    <Formik 
                        initialValues={{email: '', name: '', password: '', repeatPassword: ''}}
                        validationSchema={schema}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);
                            resetForm();
                            const registerFormValues : IRegisterRequest = {
                                name: values.name,
                                email: values.email,
                                password: values.password
                            }
                            registerUser(registerFormValues);
                            setSubmitting(false);
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid, handleSubmit }) => {
                            
                            return (<Form >
                                <Form.Group controlId='formName'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        name='name' 
                                        value={values.name}
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        className={(touched.name && errors.name) ? "errorBorder" : ""}
                                    />
                                    {touched.name && <div style={{color: 'red'}}>{errors.name}</div>}
                                </Form.Group>
                                <FormGroup controlId='formEmail'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type='text' 
                                        name='email' 
                                        value={values.email}
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        className={(touched.email && errors.email) ? "errorBorder" : ""}
                                    />
                                    {touched.email && <div style={{color: 'red'}}>{errors.email}</div>}
                                </FormGroup>
                                <FormGroup controlId='formPassword'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type='password' 
                                        name='password' 
                                        value={values.password}
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        className={(touched.password && errors.password) ? "errorBorder" : ""}
                                    />
                                    {touched.password && <div style={{color: 'red'}}>{errors.password}</div>}
                                </FormGroup>    
                                <FormGroup controlId='formRepeatPassword'>
                                    <Form.Label>Repeat Password</Form.Label>
                                    <Form.Control 
                                        type='password' 
                                        name='repeatPassword' 
                                        value={values.repeatPassword}
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        className={(touched.repeatPassword && errors.repeatPassword) ? "errorBorder" : ""}
                                    />
                                    <div style={{color: 'red'}}>{errors.repeatPassword}</div>
                                </FormGroup>  
                                <Button disabled={isSubmitting || !isValid} variant="primary" type='button' onClick={() => handleSubmit()}>Sign Up</Button>    
                            </Form>
                            )
                        }}
                    </Formik>
                </Col>
            </Row>
        </Container>
    )
}
