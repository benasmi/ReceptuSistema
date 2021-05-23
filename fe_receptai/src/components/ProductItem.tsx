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
    editItem: Function;
    setEditable: Function;
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
        setUserProducts((oldVal: IProduct[]) => (oldVal.map(product => {
            if (product.id === editProduct.id) return {...product, quantity: editProduct.quantity, quantityType: editProduct.quantityType};
            else return product ;
        })));      
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
            <td>{editingItem ? (<EditQuantity product={product} editItem={editProduct} setEditable={setEditingItem} />) : product.quantity}</td>
            <td>{editingItem ? (<EditQuantityTypeSelect product={product} editItem={editProduct} setEditable={setEditingItem} />) : product.quantityType}</td>
            <td>
                <Button variant="primary" onClick={() => setEditingItem(true)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => setModalOpen(true)}>Delete</Button>
            </td>
        </tr>
        
    </>
    )
}

function EditQuantityTypeSelect({ product, editItem, setEditable }: IEditItemSelectProps) {
    
    function editProductCall(quantityType: string) {
        editUserProduct(product.id || -1, {...product, quantityType: quantityType, id: product.id || -1 })
        .then(() => {
            toast.success('Updated successfully');
        })
        .catch(() => toast.error('Failed to edit'));
        setEditable(false);
    }
    return (
        <Form.Control defaultValue={product.quantityType} onChange={(e) => {
            editItem({id: product.productId, quantityType: e.target.value, quantity: product.quantity});
            editProductCall(e.target.value);
        }} as="select">
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
        </Form.Control>
    );
}

function EditQuantity({ product, editItem, setEditable }: IEditItemSelectProps) {
    const [quantity, setQuantity] = useState<number>(product.quantity);

    function editProductCall() {
        editUserProduct(product.id || -1, {...product, quantity, id: product.id || -1 })
        .then(() => {
            toast.success('Updated successfully');
        })
        .catch(() => toast.error('Failed to edit'));
        setEditable(false);
    }
    return (
        <>
         <Form.Control defaultValue={product.quantity} onChange={(e) => {
             setQuantity(e.target.value as unknown as number);
             editItem({id: product.productId, quantity: e.target.value, quantityType: product.quantityType});
        }} as="input"/>
        <Button onClick={editProductCall}>Save</Button>
        </>
       
    );
}