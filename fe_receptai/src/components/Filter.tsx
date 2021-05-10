import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { IFilterProps } from './RecipeList'


export default function Filter({ setFilteredProps } : { setFilteredProps: Function }) {
    const [selectedProps, setSelectedProps] = useState<IFilterProps>({ price: '', difficulty: ''})

    const handleChange = (e: React.ChangeEvent<any>) => {
        setSelectedProps((oldVal) => ({ ...oldVal, [e.target.name]: e.target.value}))
        console.log(selectedProps)
    }

    const handleClick = () => {
        setFilteredProps(selectedProps)
    }

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control as="select" name="price" custom onChange={(e) => handleChange(e)}>
                            <option value=''></option>
                            <option value='cheap'>Cheap</option>
                            <option value='average'>Average</option>
                            <option value='expensive'>Expensive</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='difficulty'>
                        <Form.Label>Difficulty</Form.Label>
                        <Form.Control as="select" name="difficulty" custom onChange={(e) => handleChange(e)}>
                            <option value=''></option>
                            <option value='easy'>Easy</option>
                            <option value='normal'>Normal</option>
                            <option value='difficult'>Difficult</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="text-center mt-3">
                <Col>
                    <Button variant="primary" onClick={handleClick}>Filter out</Button>
                </Col>
            </Row>
        </>
    )
}
