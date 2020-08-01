import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListProducts = ({allProducts, setProductsChange }) => {
  const [products, setProducts] = useState([]); //empty array

  // const setProductsChange = true;
  // const getTodos = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/products");
  //     //to catch error      
  //     //console.log(res);
  //     const parseData = await res.json();
  //     setProducts(parseData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };


  useEffect(() => {
    // getTodos();
    setProducts(allProducts);
  }, [allProducts]);

  async function deleteProduct(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/products/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setProducts(products.filter(product => product.product_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Images</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
         

          {products.length !== 0 &&
            products[0].Product_id !== null &&
            products.map(product => (
              <tr key={product.product_id}>
                <td>{product.product_name}</td>
                <td>{product.product_description}</td>
                <td>{product.product_image}</td>
                <td>
                  <EditTodo product={product} setProductsChange={setProductsChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListProducts;
