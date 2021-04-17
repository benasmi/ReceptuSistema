import React from 'react';
import { Button, Modal as ModalBS } from 'react-bootstrap';

type ModalProps = {
  message: string;
  onConfirm: Function;
  show: boolean;
  setShow: Function;
};

const Modal = ({ message, onConfirm, show, setShow }: ModalProps) => {
  return (
    <ModalBS show={show} onHide={() => setShow(false)} centered>
      <ModalBS.Header>
        <ModalBS.Title>Are you sure?</ModalBS.Title>
      </ModalBS.Header>
      <ModalBS.Body>{message}</ModalBS.Body>
      <ModalBS.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onConfirm()}>
          Delete
        </Button>
      </ModalBS.Footer>
    </ModalBS>
  );
};

export default Modal;
