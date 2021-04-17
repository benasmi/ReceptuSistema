import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import RecipeProduct from '../../components/RecipeProduct';
import { IAvailableProduct, IFullRecipe, IProduct } from './RecipePage';

export interface IProductsRecipe {
  recipe: IFullRecipe;
  setRecipe: Function;
  newProducts: IProduct[];
  setNewProducts: Function;
  availableProducts: IAvailableProduct[];
  removedProducts: number[];
  setRemovedProducts: Function;
}

export default function ProductsRecipe({
  recipe,
  setRecipe,
  newProducts,
  setNewProducts,
  availableProducts,
  removedProducts,
  setRemovedProducts,
}: IProductsRecipe) {
  const [quantityProduct, setQuantityProduct] = useState({
    id: -1,
    quantityType: '',
    quantity: '',
    name: '',
  });
  const quantities = ['sp', 'g', 'kg', 'l', 'ml'];

  function deleteProduct(id: number | undefined) {
    console.log(id);
    if (newProducts.some((it) => it.id === id)) {
      setNewProducts(newProducts.filter((it) => it.id !== id));
    } else {
      setRemovedProducts([...removedProducts, id]);
      setRecipe((oldRecipe: { products: IProduct[] }) => {
        return {
          ...oldRecipe,
          products: oldRecipe.products.filter((it) => it.id !== id),
        };
      });
    }
  }

  function displayProducts() {
    if (recipe?.products.length === 0 && newProducts.length === 0) {
      return <div>Currently no products assigned</div>;
    }

    return (
      <div>
        {recipe.products.map((product) => {
          return <RecipeProduct product={product} onDelete={deleteProduct} />;
        })}
        {newProducts.map((product, idx) => {
          return (
            <div style={{ background: 'grey' }}>
              <RecipeProduct
                key={`product@${idx}`}
                product={product}
                onDelete={deleteProduct}
              />
            </div>
          );
        })}
      </div>
    );
  }

  function addProductToRecipe() {
    const { name, quantity, quantityType, id } = quantityProduct;
    const newProd = { name, quantity, quantityType, id };
    setNewProducts([...newProducts, newProd]);
  }

  return (
    <>
      {displayProducts()}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <select
          className="form-control"
          id="product"
          value={quantityProduct.id}
          style={{ width: '150px' }}
          onChange={(event) =>
            setQuantityProduct((oldVal) => {
              return {
                ...oldVal,
                id: parseInt(event.target.value),
                name: availableProducts.filter(
                  (row) => row.id === parseInt(event.target.value)
                )[0].name,
              };
            })
          }>
          <option value="-1">-</option>
          {availableProducts.map((row) => {
            return <option value={row.id}>{row.name}</option>;
          })}
        </select>
        <select
          className="form-control"
          id="quantityType"
          value={quantityProduct.quantityType}
          onChange={(event) =>
            setQuantityProduct((oldVal) => {
              return {
                ...oldVal,
                quantityType: event.target.value,
              };
            })
          }
          style={{ width: '150px' }}>
          <option value="">-</option>
          {quantities.map((row: any) => {
            return <option value={row.name}>{row}</option>;
          })}
        </select>
        <input
          type="text"
          className="form-control"
          id="quantity"
          style={{ width: '150px' }}
          placeholder="quantity"
          value={quantityProduct.quantity}
          onChange={(event) =>
            setQuantityProduct((oldVal) => {
              return {
                ...oldVal,
                quantity: event.target.value,
              };
            })
          }
        />
        <Button variant="success" onClick={addProductToRecipe}>
          Add product
        </Button>
      </div>
    </>
  );
}
