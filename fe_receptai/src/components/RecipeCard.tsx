import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

export interface IRecipe {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
}

export interface IRecipeCard {
  recipe: IRecipe;
  editRecipe: (id: number) => void;
}

export default function RecipeCard({recipe, editRecipe}: IRecipeCard ) {
  return (
    <>
      <Card style={{ width: '18rem', marginTop: '16px' }}>
        <Card.Img variant='top' src={recipe.imageUrl || ''} />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>
            {recipe.description}
          </Card.Text>
          <Button variant='primary' onClick={() => {
            editRecipe(recipe.id);
          }}>Edit</Button>
        </Card.Body>
      </Card>
    </>
  );
};
