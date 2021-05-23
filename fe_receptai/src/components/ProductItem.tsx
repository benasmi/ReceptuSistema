import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteUserProduct, editUserProduct } from '../api/profileApi';
import { IProduct } from '../pages/profile/EditProducts'
import ConfirmModal from './ConfirmModal';

interface IProductItemProps {
    product: IProduct;
    modalOpen: boolean;
    setModalOpen: Function;
    setUserProducts: Function;
}

interface IEditItemSelectProps {
    product : IProduct;
    editItem: Function
}

export interface IEditProduct {
    quantity: number;
    quantityType: string;
    id: number;
}

export default function ProductItem({ product, modalOpen, setModalOpen, setUserProducts }: IProductItemProps) {
    const [editingItem, setEditingItem] = useState<boolean>(false);

    function deleteProduct(id: number) {
        deleteUserProduct(id)
            .then(() => {
                toast.success('Deleted successfully.');
                setUserProducts((oldVal: IProduct[]) => oldVal.filter((prod) => prod.id !== id));
            })
            .catch(() => toast.error('Failed to delete'));
        setModalOpen(false);
    }

    function editProduct(editProduct: IEditProduct) {
        
        editUserProduct(editProduct.id, editProduct)
            .then(() => {
                toast.success('Updated successfully');
                setUserProducts((oldVal: IProduct[]) => (oldVal.map(product => {
                    if (product.id === editProduct.id) return {...product, quantity: editProduct.quantity, quantityType: editProduct.quantityType};
                    else return product ;
                })));
            })
            .catch(() => toast.error('Failed to edit'));
        setEditingItem(false);
    }
    

    return (
    <>
        <ConfirmModal 
            message="Do you want to delete this product?"
            onConfirm={() => deleteProduct(product.id as number)}
            show={modalOpen}
            setShow={setModalOpen}
            />
        <tr key={product.id}>
            <td>{product.name}</td>
            <td>{editingItem ? (<EditQuantity product={product} editItem={editProduct} />) : product.quantity}</td>
            <td>{editingItem ? (<EditQuantityTypeSelect product={product} editItem={editProduct} />) : product.quantityType}</td>
            <td>
                <Button variant="primary" onClick={() => setEditingItem(true)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => setModalOpen(true)}>Delete</Button>
            </td>
        </tr>
        
    </>
    )
}

function EditQuantityTypeSelect({ product, editItem }: IEditItemSelectProps) {

    return (
        <Form.Control defaultValue={product.quantityType} onChange={(e) => {
            editItem({id: product.productId, quantityType: e.target.value, quantity: product.quantity});
        }} as="select">
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
        </Form.Control>
    );
}

function EditQuantity({ product, editItem }: IEditItemSelectProps) {

    return (
        <Form.Control defaultValue={product.quantity} onChange={(e) => {
            editItem({id: product.productId, quantity: e.target.value});
        }} as="input"/>
    );
}