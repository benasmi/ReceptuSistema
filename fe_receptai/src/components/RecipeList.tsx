import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRecipes } from '../api/recipesApi';
import GeneralRecipeCard from './GeneralRecipeCard';
import { IRecipe } from './RecipeCard';
import './styles.css';

export default function RecipeList() {
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const history = useHistory();
    useEffect(() => {
        getRecipes()
            .then((data: IRecipe[]) => setRecipes(data))
            .catch(() => toast.error('Unable to get recipes.'))
    }, [])

    function handleClick(id: number) {
        history.push(`/app/recipe/${id}`);
    }

    return (
        <Container>
            <Row>
                {recipes.length === 0 && (
                <Col>
                    <p className="h3 text-center">There are no recipes created.</p>
                </Col>
                )}
            </Row>
            {recipes.map((recipe) => (
               <Row key={recipe.id}>
                    <Col md="12" className="pb-4 pointer" onClick={() => handleClick(recipe.id)}>
                        <GeneralRecipeCard recipe={recipe} />
                    </Col>
               </Row> 
              
            ))} 
        </Container>
      );
}
