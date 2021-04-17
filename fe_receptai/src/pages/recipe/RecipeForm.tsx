import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IRecipe } from '../../components/RecipeCard';
import {
  addRecipe,
  addRecipeProducts,
  deleteRecipeProducts,
  getRecipe,
} from '../../api/recipesApi';
import { AxiosError } from 'axios';
import { updateRecipe as updateRecipeRequest } from '../../api/recipesApi';
import { getProducts } from '../../api/productsApi';
import ProductsRecipe from './ProductsRecipe';
import { toast } from 'react-toastify';

const recipeInitial: IFullRecipe = {
  id: -1,
  title: '',
  description: '',
  price: 'cheap',
  difficulty: 'easy',
  imageUrl: '',
  products: [],
};

export interface IProduct {
  name?: string;
  quantity: string | number;
  quantityType: string;
  id?: number;
}

export interface IFullRecipe extends IRecipe {
  price: string;
  difficulty: string;
  products: IProduct[];
}

export interface IAvailableProduct {
  name: string;
  id: number;
}

export default function RecipeForm() {
  let { id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState<IFullRecipe>(recipeInitial);
  const [availableProducts, setAvailableProducts] = useState<
    IAvailableProduct[]
  >([]);

  const [newProducts, setNewProducts] = useState<IProduct[]>([]);
  const [removedProducts, setRemovedProducts] = useState<number[]>([]);

  useEffect(() => {
    if (id) {
      getRecipe(id).then((recipe: IFullRecipe) => {
        setRecipe(recipe);
      });
    }
    getProducts().then((products: IAvailableProduct[]) => {
      setAvailableProducts(products);
    });
  }, [id]);

  function updateRecipe() {
    if (recipe) {
      Promise.all([
        updateRecipeRequest(id, { ...recipe }),
        addRecipeProducts(id, newProducts),
        deleteRecipeProducts(id, removedProducts),
      ])
        .then(() => {
          toast.success('Successfully updated');
          history.push('/app/my-recipes');
        })
        .catch((err: AxiosError<Error>) => {
          toast.error('Failed to update');
        });
    }
  }

  function insertRecipe() {
    addRecipe({ ...recipe, products: [...newProducts] })
      .then(() => {
        toast.success('Recipe added successfully');
        history.push('/app/my-recipes');
      })
      .catch(() => {
        toast.error('Failed to add');
      });
  }

  function updateFields(id: string, value: string | number) {
    setRecipe((oldVal) => {
      return {
        ...oldVal,
        [id]: value,
      };
    });
  }

  return (
    <div>
      <form>
        <img src={recipe?.imageUrl || ''} alt="recipe" style={{ width: 200 }} />
        <div className="form-group">
          <label htmlFor="imageUrl">Recipe image</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            placeholder="Enter recipe image"
            value={recipe?.imageUrl || ''}
            onChange={(event) => updateFields('imageUrl', event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Recipe title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter recipe title"
            value={recipe?.title}
            onChange={(event) => updateFields('title', event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Recipe description</label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            value={recipe?.description}
            onChange={(event) =>
              updateFields('description', event.target.value)
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Select difficulty</label>
          <select
            className="form-control"
            id="difficulty"
            value={recipe?.difficulty}
            onChange={(event) =>
              updateFields('difficulty', event.target.value)
            }>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Select price</label>
          <select
            className="form-control"
            id="price"
            value={recipe?.price}
            onChange={(event) => updateFields('price', event.target.value)}>
            <option value="cheap">Cheap</option>
            <option value="average">Average</option>
            <option value="expensive">Expensive</option>
          </select>
        </div>
        <div>
          <p>Products</p>
          <ProductsRecipe
            recipe={recipe}
            setRecipe={setRecipe}
            newProducts={newProducts}
            setNewProducts={setNewProducts}
            availableProducts={availableProducts}
            removedProducts={removedProducts}
            setRemovedProducts={setRemovedProducts}
          />
        </div>
      </form>
      <div>
        {recipe?.id === -1 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={insertRecipe}>
            Insert
          </button>
        )}
        {recipe?.id !== -1 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={updateRecipe}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
