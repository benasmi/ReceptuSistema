import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { deleteRecipe } from '../api/recipesApi';
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
      <Modal
        message={`Do you want to delete "${recipe.title}"?`}
        onConfirm={handleDelete}
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
              <Button
                variant="light"
                onClick={() => history.push(`/app/my-recipes/${recipe.id}`)}>
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
