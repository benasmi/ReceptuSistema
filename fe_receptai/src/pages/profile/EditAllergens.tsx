import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getAllergens } from '../../api/allergensApi';
import { addUserAllergen, getUserAllergens } from '../../api/profileApi';
import AllergenItem from '../../components/AllergenItem';
import * as Yup from 'yup';
import { useHistory } from 'react-router';

export interface IAllergen {
    id?: number;
    name?: string;
    intensity?: string
}

export default function EditAllergens() {
    const [userAllergens, setUserAllergens] = useState<IAllergen[]>([]);
    const [allergens, setAllergens] = useState<IAllergen[]>([]);
    const [filteredAllergens, setFilteredAllergens] = useState<IAllergen[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        getUserAllergens()
            .then((data: IAllergen[]) => setUserAllergens(data))
            .catch(() => console.log('error'));
        getAllergens()
            .then((data: IAllergen[]) => setAllergens(data))
            .catch(() => console.log('error'));
    }, [])

    useEffect(() => {
        setFilteredAllergens(allergens.filter((allergen) => !userAllergens.map(al => al.id).includes(allergen.id)));
    }, [userAllergens, allergens])

    function addAllergen(name: string, intensity: string) {
        const values = name.split(":");
        const allergen: IAllergen = {
            id: values[0] as unknown as number,
            name: values[1],
            intensity: intensity
        }
        addUserAllergen(allergen)
            .then(() => {
                setUserAllergens(oldVal => ([...oldVal, allergen]));
                toast.success('Allergen added');
            })
            .catch(() => {
                toast.error('Failed to add allergen');
            })
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(1).required(),
        intensity: Yup.string().min(1).required()
    })

    return (
        <>
        <Container>
            <Row className="mb-3">
                <Col>
                <h1 className='text-center'>Allergens</h1>
                </Col>
            </Row>
            <Button variant="link" onClick={() => history.push('/app/profile')}>Go Back</Button>
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
                                <AllergenItem 
                                    key={allergen.id}
                                    allergen={allergen} 
                                    modalOpen={modalOpen} 
                                    setModalOpen={setModalOpen} 
                                    setUserAllergens={setUserAllergens} 
                                />
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
                <hr />
                <Formik
                    initialValues={{name: "", intensity: ""}}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm }) => {
                        setSubmitting(true)
                        addAllergen(values.name, values.intensity);
                        resetForm();
                        setSubmitting(false);
                    }}
                >
                    {({ values, handleSubmit, handleChange, isSubmitting}) => {
                        return (
                            <Form>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Allergens</Form.Label>
                                            <Form.Control as="select" value={values.name} name="name" onChange={handleChange}>
                                                <option value=""></option>
                                                {filteredAllergens.map((allergen) => (
                                                    <option key={allergen.id} value={`${allergen.id}:${allergen.name}`}>{allergen.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Intensity</Form.Label>
                                            <Form.Control as="select" value={values.intensity} name="intensity" onChange={handleChange}>
                                                <option value=""></option>
                                                <option value="weak">weak</option>
                                                <option value="high">high</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Button variant="success" disabled={values.name === "" || values.intensity === ""  || isSubmitting} onClick={() => handleSubmit()}>Add New</Button>
                            </Form>
                        )
                    }}
                </Formik>
        </Container>
        </>
    )
}
