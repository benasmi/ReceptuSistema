import React, { useEffect, useState } from 'react';
import RecipeCard, { IRecipe } from '../../components/RecipeCard';
import {
  deleteRecipe as betterDeleteRecipe,
  getMyRecipes,
} from '../../api/recipesApi';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserRecipeList() {
  const history = useHistory();

  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    getMyRecipes()
      .then((data: IRecipe[]) => setRecipes(data))
      .catch(() => {});
  }, []);

  const addNewRecipe = () => {
    history.push('/app/recipe');
  };

  const editRecipe = (id: number) => {
    history.push(`/app/recipe/edit/${id}`);
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((i) => i.id !== id));
    betterDeleteRecipe(id)
      .then(() => toast.success('Successfully deleted'))
      .catch(() => toast.error('Failed to delete'));
  };

  return (
    <Container>
      <Row>
        {recipes.length === 0 && (
          <Col>
            <p className="h3 text-center">You haven't created any recipes</p>
          </Col>
        )}

        {recipes.map((recipe) => (
          <Col key={recipe.id} xs="6" className="pb-4">
            <RecipeCard
              recipe={recipe}
              onEdit={() => editRecipe(recipe.id)}
              onDelete={() => deleteRecipe(recipe.id)}
            />
          </Col>
        ))}
      </Row>

      <Row className="m-3 text-center">
        <Col>
          <Button variant="primary" onClick={addNewRecipe}>
            Add new
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
