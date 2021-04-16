import React, { useEffect, useState } from 'react';
import {
  useParams,
  useHistory
} from 'react-router-dom';
import { IRecipe } from '../../components/RecipeCard';
import { getRecipe } from '../../api/recipesApi';
import { AxiosError } from 'axios';
import { deleteRecipe as deleteRecipeRequest, updateRecipe as updateRecipeRequest } from '../../api/recipesApi';
import { Button } from 'react-bootstrap';
import { getProducts } from '../../api/productsApi';

const recipeInitial: IFullRecipe = {
  id: -1,
  title: '',
  description: '',
  price: '',
  difficulty: '',
  imageUrl: '',
  products: []
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
  products: IProduct[]
}

export interface IAvailableProduct {
  name: string;
  id: number;
}

const quantities = ['sp', 'g', 'kg', 'l', 'ml'];

export default function RecipePage() {
  let { id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState<IFullRecipe>(recipeInitial);
  const [availableProducts, setAvailableProducts] = useState<IAvailableProduct[]>([]);

  const [quantityProduct, setQuantityProduct] = useState({ productId: -1, quantityType: '', quantity: '', name:'' });


  useEffect(() => {
    //todo: use Promise all
    getRecipe(id).then((data: IFullRecipe) => {
      setRecipe(data);
    }).catch((err: AxiosError<Error>) => {
      console.log('Error');
    });

    getProducts().then((data: IAvailableProduct[]) => {
      setAvailableProducts(data);
    });

  }, [id]);


  //todo: move to redux state
  function deleteRecipe() {
    deleteRecipeRequest(id).then(() => {
      history.push('/app/my-recipes');
    }).catch((err: AxiosError<Error>) => {
      //Display toast
    });
  }

  function updateRecipe() {
    if (recipe) {
      updateRecipeRequest(id, { ...recipe }).then(() => {
        //Show success toast
      }).catch((err: AxiosError<Error>) => {
        //Display toast
      });
    }
  }

  function updateFields(id: string, value: string | number) {
    setRecipe(oldVal => {
      return {
        ...oldVal,
        [id]: value
      };
    });
  }

  function deleteProduct(id: number) {

  }

  function displayProducts() {
    if (recipe?.products.length === 0) {
      return <div>
        Currently no products assigned
      </div>;
    }
    console.log(recipe.products)
    return recipe?.products.map((product) => {
      return <div style={{ display: 'flex', flexDirection: 'row', padding: '4px' }}>
        <div>
          {product.name}
        </div>
        <div style={{marginLeft: 8}}>
          {product.quantityType}/{product.quantity}
        </div>
        <Button onClick={() => deleteProduct(product.id!!)} style={{marginLeft: 8}}>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-square'
               viewBox='0 0 16 16'>
            <path
              d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
            <path
              d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
          </svg>
        </Button>
      </div>;
    });
  }

  function addProductToRecipe() {
    const {name, quantity, quantityType, productId} = quantityProduct
    setRecipe(oldVal => {
      return {
        ...oldVal,
        products: [...oldVal.products, {name, quantity, quantityType, id: productId}]
      };
    });
  }

  useEffect(()=>{
    console.log(recipe)
  }, [recipe])

  function ProductsRecipe(){
    return (
      <>
        {displayProducts()}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <select className='form-control'
                  id='product'
                  value={quantityProduct.productId}
                  style={{ width: '150px' }}
                  onChange={(event) => setQuantityProduct(oldVal => {
                    return {
                      ...oldVal,
                      productId: parseInt(event.target.value),
                      name: availableProducts.filter(row=>row.id==parseInt(event.target.value))[0].name
                    };
                  })}
          >
            <option value="-1">-</option>
            {
              availableProducts.map(row => {
                return <option value={row.id}>{row.name}</option>;
              })
            }
          </select>
          <select className='form-control' id='quantityType' value={quantityProduct.quantityType}

                  onChange={(event) => setQuantityProduct(oldVal => {
                    return {
                      ...oldVal,
                      quantityType: event.target.value
                    };
                  })}
                  style={{ width: '150px' }}>
            <option value=''>-</option>
            {
              quantities.map((row: any) => {
                return <option value={row.name}>{row}</option>;
              })
            }
          </select>
          <input type='text'
                 className='form-control'
                 id='quantity'
                 style={{width: '150px'}}
                 placeholder='quantity'
                 value={quantityProduct.quantity}
                 onChange={(event) => setQuantityProduct(oldVal => {
                   return {
                     ...oldVal,
                     quantity: event.target.value
                   };
                 })}
          />
          <Button variant='success' onClick={addProductToRecipe}>Add product</Button>
        </div>
      </>
    )
  }

  return (
    <div>
      <form>
        <img
          src={recipe?.imageUrl || ''}
          alt='recipe'
        />
        <div className='form-group'>
          <label htmlFor='imageUrl'>Recipe image</label>
          <input type='text'
                 className='form-control'
                 id='imageUrl'
                 placeholder='Enter recipe image'
                 value={recipe?.imageUrl || ''}
                 onChange={(event) => updateFields('imageUrl', event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='title'>Recipe title</label>
          <input type='text'
                 className='form-control'
                 id='title'
                 placeholder='Enter recipe title'
                 value={recipe?.title}
                 onChange={(event) => updateFields('title', event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Recipe description</label>
          <textarea className='form-control'
                    id='description'
                    rows={3}
                    value={recipe?.description}
                    onChange={(event) => updateFields('description', event.target.value)}
          ></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='difficulty'>Select difficulty</label>
          <select className='form-control' id='difficulty' value={recipe?.difficulty}
                  onChange={(event) => updateFields('difficulty', event.target.value)}>
            <option value='easy'>Easy</option>
            <option value='normal'>Normal</option>
            <option value='difficult'>Difficult</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Select price</label>
          <select className='form-control' id='price' value={recipe?.price}
                  onChange={(event) => updateFields('price', event.target.value)}>
            <option value='cheap'>Cheap</option>
            <option value='average'>Average</option>
            <option value='expensive'>Expensive</option>
          </select>
        </div>
        <div>
          <p>
            Products
          </p>
          <ProductsRecipe />
        </div>

      </form>
      <div>
        {recipe?.id && <button type='button' className='btn btn-primary' onClick={updateRecipe}>Update</button>}
        {recipe?.id && <button type='button' className='btn btn-danger' onClick={deleteRecipe}>Delete</button>}
      </div>
    </div>
  );
};


