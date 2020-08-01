import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";


const InputTodo = ({ setProductsChange }) => {

  const [inputs, setInputs] = useState({
    product_name: "",
    product_description: "",
    category_id: "1",
    image: ""

  });
  const {product_name, product_description, image, category_id } = inputs;
  
  const onChange = e => {
    setInputs ({ ...inputs, [e.target.name]: e.target.value });
  }

  const  resetInputs = () => setInputs({ 
    product_name: "",
    product_description: "",
    category_id: "1",
    image: "" 
  });


  const addTodo = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { product_name, product_description, image, category_id };
      const response = await fetch("http://localhost:5000/dashboard/products", {
     // const response = await fetch("http://localhost:5000/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();


      // if(!parseResponse === ""){
      //   setTodosChange(true);
      //   setInputs ({ product_name: "" });
      //   toast.success("Register Successfully");
      // } else {
      //   toast.error("ne");
      //   setTodosChange(false);
       
      // }
      setProductsChange(true);
      resetInputs();
      // setInputs ({ 
      //   product_name: "",
      //   product_description: "",
      //   category_id: "1",
      //   image: "" 
      // });

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Products registered</h1>
      <div className="btn-modal">
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target={`#id1`}
        >
          Add
        </button>
      </div>


      <div
        className="modal"
        id={`id1`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add Products</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              Name
              <input
                type="text"
                className="form-control"
                name="product_name"
                value={product_name}
                onChange={ e => onChange(e)}
                autoFocus
              />
              
            </div>

            <div className="modal-body">
              Description
              <input
                type="text"
                className="form-control"
                name="product_description"
                value={product_description}
                onChange={ e => onChange(e)}
                autoFocus
              />
              
            </div>
            <div className="modal-body">
              Image
              <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={image}
                  onChange={ e => onChange(e)}
                />
            </div>

            <div className="modal-body"> Category
            <select id="inputState" className="form-control" name="category_id" onChange={ e => onChange(e)}>
              <option value="1">Rent</option>
              <option value="2">Flower</option>
              <option value="3">Clothes</option>
            </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => addTodo(e)}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
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

export default InputTodo;
