import React, { useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { deleteRecipe } from '../api/recipesApi';
import { Pencil, Trash } from 'react-bootstrap-icons';

export interface IRecipe {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

type RecipeCardProps = {
  recipe: IRecipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    setShowModal(false);
    // TODO use a better reload mechanism
    window.location.reload();
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete "{recipe.title}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Card>
        <Card.Img className="card-image" src={recipe.imageUrl} variant="top" />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>

          <Row>
            <Col xs="auto" className="mr-auto">
              <Button
                onClick={() => history.push(`/app/my-recipes/${recipe.id}`)}>
                View
              </Button>
            </Col>

            <Col xs="auto" className="pr-0">
              <Button
                variant="light"
                onClick={() =>
                  history.push(`/app/my-recipes/${recipe.id}/edit`)
                }>
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
