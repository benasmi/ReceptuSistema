import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRecipePage, getRecommendedRecipes } from '../api/recipesApi';
import Filter from './Filter';
import GeneralRecipeCard from './GeneralRecipeCard';
import { IRecipe } from './RecipeCard';
import './styles.css';

export interface IRecipePage {
    recipes: IRecipe[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
}

export interface IPagingProps {
    page: number;
    size: number;
}

export interface IFilterProps {
    difficulty: string;
    price: string;
}

export default function RecipeList() {
    const [recipePage, setRecipePage] = useState<IRecipePage>({ recipes: [], currentPage: 0, totalItems: 0, totalPages: 0});
    const [pagingProps, setPagingProps] = useState<IPagingProps>({ page: 0, size: 3 })
    const [filterProps, setfilterProps] = useState<IFilterProps>({ price: '', difficulty: ''})
    const [showRecommended, setShowRecommended] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        if (showRecommended) {
            getRecommendedRecipes()
                .then((data: IRecipePage) => { 
                    setRecipePage(data);
                    if (data.totalItems === 0) toast.info('Unfortunately, there are no recommended recipes.'); 
                })
                .catch(() => toast.error('Unable to recommend recipes.'));
        } else {
            getRecipePage(pagingProps, filterProps)
            .then((data: IRecipePage) => setRecipePage(data))
            .catch(() => toast.error('Unable to get recipes.'))
        }
        
    }, [pagingProps, filterProps, showRecommended])

    const handleClick = (id: number) => {
        history.push(`/app/recipe/${id}`);
    }

    const handleClickPage = (direction: string) => {
        if (direction === 'next') setPagingProps((oldVal) => ({...oldVal, page: oldVal.page + 1}))
        else setPagingProps((oldVal) => ({...oldVal, page: oldVal.page - 1})) 
    }

    const nextPageUnavailable: boolean = (recipePage?.totalPages - recipePage?.currentPage) < 2;
    const previousPageUnavailable: boolean = recipePage?.currentPage === 0;

    return (
        <Container>
            <Row className="mb-4">
                {recipePage?.totalItems === 0 && (
                <Col >
                    <p className="h3 text-center">There are no recipes created.</p>
                </Col>
                )}
            </Row>
            <Row>
                <Col md="3">
                    <Row className="text-center mb-3">
                        <Col>
                            <Button onClick={() => setShowRecommended(!showRecommended)}>
                                {showRecommended ? 'Show All Recipes' : 'Show Recommended Recipes'}
                            </Button>
                        </Col>
                    </Row>
                    {!showRecommended && (
                        <Row>
                            <Col>
                                <Filter setFilteredProps={setfilterProps} />
                            </Col>
                        </Row>
                    )}
                    
                </Col>
                <Col>
                    {recipePage?.recipes.map((recipe) => (
                        <Row key={recipe.id}>
                                <Col md="12" className="pb-4 pointer" onClick={() => handleClick(recipe.id)}>
                                    <GeneralRecipeCard recipe={recipe} />
                                </Col>
                        </Row> 
              
                    ))}
                   { !showRecommended && recipePage.totalItems !== 0 && <div>
                        <Button variant="primary" disabled={previousPageUnavailable} onClick={() => handleClickPage('back')} >Back</Button>{' '}
                        <Button variant="primary" disabled={nextPageUnavailable} onClick={() => handleClickPage('next')}>Next</Button>
                    </div> }
                </Col>
            </Row>
        </Container>
      );
}
