import React, { useEffect, useState } from 'react'
import { Button, Card, Jumbotron, ListGroup, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import { getRecipe } from '../../api/recipesApi'
import { IFullRecipe, IProduct } from './RecipeForm'
import { Image} from 'react-bootstrap';
import { formShoppingCart as formCart } from '../../api/shoppingCartApi'
import CartModal from '../../components/CartModal';

const priceName: Record<string, string> = {
    "cheap": "$",
    "average": "$$",
    "expensive": "$$$"
}

interface IRecipeViewParams {
    id: string;
}

export default function RecipeView() {
    const { id }: IRecipeViewParams = useParams();
    const [recipe, setRecipe] = useState<IFullRecipe>();
    const [showCartModal, setShowCartModal] = useState<boolean>(false);
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        getRecipe(+id)
            .then((recipe: IFullRecipe) => setRecipe(recipe))
            .catch(() => toast.error('Unable to get recipe'))
    }, [id]);

    function formShoppingCart(): void {
        formCart(id)
            .then((data: IProduct[]) => {
                setCartProducts(data);
                setShowCartModal(true);
            })
    }

    return recipe? (
        <>
        <CartModal show={showCartModal} setShow={setShowCartModal} products={cartProducts}/>
        <Jumbotron>
            <h1 className="d-flex justify-content-center">
                {recipe.title}
            </h1>
            <div className="d-flex justify-content-center">
                <Image src={recipe.imageUrl} thumbnail />
            </div>
            <div>
                <Card>
                    <ListGroup.Item>
                        <h4>Description</h4>
                        <div>{recipe.description}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Difficulty</h4>
                        <div>{recipe.difficulty}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Products</h4>
                        {recipe.products.map(product => <div>
                            {product.name} - {product.quantity} {product.quantityType}
                        </div>)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Price</h4>
                        <span>{recipe.price.toUpperCase()} - {priceName[recipe.price]} </span>
                    </ListGroup.Item>
                </Card>
                <Button className="mt-3" variant="primary" onClick={formShoppingCart}>Form shopping cart</Button>
            </div>
        </Jumbotron>
        </>
    ) : <Spinner animation="border" />;
}
