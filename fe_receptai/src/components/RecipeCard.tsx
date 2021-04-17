import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import './styles.css';
import { Pencil, Trash } from 'react-bootstrap-icons';
import Modal from './Modal';

export interface IRecipe {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

type RecipeCardProps = {
  recipe: IRecipe;
  onEdit: Function;
  onDelete: Function;
};

export default function RecipeCard({
  recipe,
  onEdit,
  onDelete,
}: RecipeCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal
        message={`Do you want to delete "${recipe.title}"?`}
        onConfirm={onDelete}
        show={showModal}
        setShow={setShowModal}
      />

      <Card>
        <Card.Img className="card-image" src={recipe.imageUrl} variant="top" />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>

          <Row className="justify-content-end">
            <Col xs="auto" className="pr-0">
              <Button variant="light" onClick={() => onEdit()}>
                <Pencil className="icon" />
              </Button>
            </Col>

            <Col xs="auto">
              <Button variant="light" onClick={() => setShowModal(true)}>
                <Trash className="icon" />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
