import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProducts } from "../../api/productsApi";
import { addUserProduct, getUserProducts } from "../../api/profileApi";
import * as Yup from 'yup';
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import ProductItem from "../../components/ProductItem";
import { Formik } from "formik";
import { toast } from "react-toastify";

export interface IProduct {
    id?: number;
    productId?: number;
    name?: string;
    quantity: number;
    quantityType: string;
  }

  export interface IEditProduct {
    quantity: number;
    quantityType: string;
}

export default function EditProducts() {
    const [userProducts, setUserProducts] = useState<IProduct[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        getUserProducts()
            .then((data: IProduct[]) => setUserProducts(data))
            .catch(() => console.log('error'));
        getProducts()
            .then((data: IProduct[]) => setProducts(data))
            .catch(() => console.log('error'));
    }, []);

    useEffect(() => {
        setFilteredProducts(products.filter((p) => !userProducts.map(al => al.id).includes(p.id)));
    }, [userProducts, products])

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(1).required(),
        quantityType: Yup.string().min(1).required(),
        quantity: Yup.string().min(1).required(),
    })

    function addProduct(name: string, quantity: number, quantityType: string) {
        const values = name.split(":");
        const product: IProduct = {
            id: values[0] as unknown as number,
            name: values[1],
            quantity: quantity,
            quantityType: quantityType,
        }
        addUserProduct(product)
            .then(() => {
                setUserProducts(oldVal => ([...oldVal, product]));
                toast.success('Product added');
            })
            .catch(() => {
                toast.error('Failed to add product');
            })
    }

    return (
    <>
    <Container>
        <Row className="mb-3">
            <Col>
            <h1 className='text-center'>My products</h1>
            </Col>
        </Row>
        <Button variant="link" onClick={() => history.push('/app/profile')}>Go Back</Button>
    </Container>
    <Row>
        <Col>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Quantity type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userProducts.map((product) => (<ProductItem
                        key={product.id}
                        product={product} 
                        modalOpen={modalOpen} 
                        setModalOpen={setModalOpen} 
                        setUserProducts={setUserProducts} 
                    />))}
                </tbody>
            </Table>
        </Col>
    </Row>
    <Formik
        initialValues={{name: "", quantity: 0, quantityType: ""}}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm }) => {
            setSubmitting(true)
            addProduct(values.name, values.quantity, values.quantityType);
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
                                <Form.Label>Products</Form.Label>
                                <Form.Control as="select" value={values.name} name="name" onChange={handleChange}>
                                    <option value=""></option>
                                    {filteredProducts.map((product) => (
                                        <option key={product.id} value={`${product.id}:${product.name}`}>{product.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control as="input" value={values.quantity} name="quantity" onChange={handleChange}>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>QuantityType</Form.Label>
                                <Form.Control as="select" value={values.quantityType} name="quantityType" onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="g">g</option>
                                    <option value="kg">kg</option>
                                    <option value="l">l</option>
                                    <option value="ml">ml</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Button variant="success" 
                    disabled={values.name === "" || values.quantityType === ""  || values.quantity === 0 || isSubmitting} 
                    onClick={() => handleSubmit()}>Add New</Button>
                </Form>
            )
        }}
    </Formik>
    </>
    )
}