import React from 'react'
import { Button, Modal as ModalBS } from 'react-bootstrap';
import { IProduct } from '../pages/recipe/RecipeForm';

interface ICartModalProps {
    products: IProduct[];
    show: boolean;
    setShow: Function;
}

const CartModal = ({ products, show, setShow }: ICartModalProps) => {
    return (
      <ModalBS show={show} onHide={() => setShow(false)} centered>
        <ModalBS.Header>
          <ModalBS.Title>Shopping Cart</ModalBS.Title>
        </ModalBS.Header>
        <ModalBS.Body>
            <ul>
                {products.map(product => (<li key={product.id}>{product.name}</li>))}
            </ul></ModalBS.Body>
        <ModalBS.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => alert('Bought')}>
            Buy
          </Button>
        </ModalBS.Footer>
      </ModalBS>
    );
  };
  
  export default CartModal;
