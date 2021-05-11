import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getAllergens } from '../../api/allergensApi';
import { addUserAllergen, deleteUserAllergen, getUserAllergens } from '../../api/profileApi';
import ConfirmModal from '../../components/ConfirmModal';

export interface IAllergen {
    id?: number;
    name?: string;
    intensity?: string
}

export default function EditAllergens() {
    const [userAllergens, setUserAllergens] = useState<IAllergen[]>([]);
    const [allergens, setAllergens] = useState<IAllergen[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        getUserAllergens()
            .then((data: IAllergen[]) => setUserAllergens(data))
            .catch(() => console.log('error'));
        getAllergens()
            .then((data: IAllergen[]) => setAllergens(data))
            .catch(() => console.log('error'));
    }, [])

    function filterAllergens(allergens: IAllergen[], userAllergens: IAllergen[]): IAllergen[] {
        return allergens.filter((allergen) => !userAllergens.map(al => al.id).includes(allergen.id))
    }
    
    const [newAllergen, setNewAllergen] = useState<IAllergen>();

    const disabledButton: boolean = newAllergen?.name == null || newAllergen.intensity == null || newAllergen.name === "" || newAllergen.intensity === "";

    function handleChange(e: ChangeEvent<any>) {
        const values = (e.target.value as string).split(":");
        setNewAllergen(oldVal => ({ ...oldVal, id: values[0]as unknown as number, name: values[1]}))

    }

    function addAllergen() {
        addUserAllergen(newAllergen!)
            .then(() => {
                setUserAllergens(oldVal => ([...oldVal, newAllergen!]));
                toast.success('Allergen added');
            })
            .catch(() => {
                toast.error('Failed to add allergen');
            })
    }

    return (
        <>
        {/* <ConfirmModal 
            message="Do you want to delete this allergen?"
            onConfirm={() => deleteAllergen()}
            show={modalOpen}
            setShow={setModalOpen}/> */}
        <Container>
            <Row className="mb-5">
                <Col>
                <h1 className='text-center'>Allergens</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Intensity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userAllergens.map((allergen) => (
                                <tr key={allergen.id}>
                                    <td>{allergen.name}</td>
                                    <td>{allergen.intensity}</td>
                                    <td>
                                        <Button variant="primary">Edit</Button>{' '}
                                        <Button variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <hr />
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Allergens</Form.Label>
                                <Form.Control as="select" defaultValue="" onChange={handleChange}>
                                    <option value=""></option>
                                    {filterAllergens(allergens, userAllergens).map((allergen) => (
                                        <option key={allergen.id} value={`${allergen.id}:${allergen.name}`}>{allergen.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Intensity</Form.Label>
                                <Form.Control as="select" defaultValue="" onChange={(e) => setNewAllergen(oldVal => ({...oldVal, intensity: e.target.value}))}>
                                    <option value="" ></option>
                                    <option value="weak">weak</option>
                                    <option value="high">high</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    
                    <Button variant="success" disabled={disabledButton} onClick={addAllergen}>Add New</Button>
                </Col>
            </Row>
        </Container>
        </>
    )
}
