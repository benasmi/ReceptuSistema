import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { IRecipe } from './RecipeCard'

export interface IGeneralRecipeCardProps {
    recipe: IRecipe
}

export default function GeneralRecipeCard({ recipe }: IGeneralRecipeCardProps) {
    return (
        <Card>
        <Card.Img className="card-image" src={recipe.imageUrl} variant="top" />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>

          <Row className="justify-content-end">
            <Col xs="auto" className="pr-0">
              <Button variant="light">
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}
