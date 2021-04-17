import React, { useEffect, useState } from 'react';
import RecipeCard, { IRecipe } from '../../components/RecipeCard';
import { getMyRecipes } from '../../api/recipesApi';
import { Col, Container, Row } from 'react-bootstrap';

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    getMyRecipes()
      .then((data: IRecipe[]) => setRecipes(data))
      .catch(() => {});
  }, []);

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
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
