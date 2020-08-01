import React, { Fragment, useState } from "react";

const EditTodo = ({ product, setProductsChange }) => {
  //editText function
    const editText = async id => {
    try {
      const body = { name, description, category, image };
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/dashboard/products/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setProductsChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
// 
  const getCategories = () => {
    
  }

  const [inputs, setInputs] = useState({
    name: product.product_name,
    description: product.product_description,
    category: product.product_category,
    image: product.product_image
  });

  const onChange = e => {
    console.log(e.target.value);
    setInputs ({ ...inputs, [e.target.name]: e.target.value });
  }

  const {name, description, category, image } = inputs;
  
  const reset = () => {
    document.getElementById("description").value = product.product_description;
    document.getElementById("image").value = product.product_image;
  }

   
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${product.product_id}`}
      >
        Edit
      </button>
      {/* id = "id21"*/}
      <div
        className="modal"
        id={`id${product.product_id}`}
        onClick={() => reset()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Product</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => reset()}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">Product
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={ e => onChange(e)}
              />
            </div>

            <div className="modal-body"> Category 
            
            <select id="inputState" className="form-control" name="category" onChange={ e => onChange(e)}>
              <option value="1">Rent</option>
              <option value="2">Flower</option>
              <option value="3">Clothes</option>
            </select>
            </div>

            <div className="modal-body"> Description
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={description}
                onChange={ e => onChange(e)}
              />
            </div>

            <div className="modal-body"> Path image
              <input
                type="text"
                id="image"
                className="form-control"
                name="image"
                value={image}
                onChange={ e => onChange(e)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(product.product_id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => reset()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;