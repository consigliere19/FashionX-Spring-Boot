import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ItemService from "../services/ItemService";

export default function AddItem() {
  const history = useHistory();
  const params = useParams();
  const [id, setId] = useState(params.id);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [latest, setLatest] = useState("");
  const [image_url, setImage_url] = useState("");
  const [cost, setCost] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (id === "_add") {
      return;
    } else {
      ItemService.getItemById(id).then((res) => {
        let item = res.data;
        setName(item.name);
        setCategory(item.category);
        setLatest(item.latest);
        setImage_url(item.image_url);
        setCost(item.cost);
        setDiscount(item.discount);
        setType(item.type)
      });
    }
  }, [id]);
  const changeNameHandler = (event) => {
    setName(event.target.value);
  };
  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const changeLatestHandler = (event) => {
    setLatest(event.target.value);
  };
  const changeImage_urlHandler = (event) => {
    setImage_url(event.target.value);
  };
  const changeCostHandler = (event) => {
    setCost(parseInt(event.target.value));
  };
  const changeDiscountHandler = (event) => {
    setDiscount(parseInt(event.target.value));
  };
  const changeTypeHandler = (event) => {
    setType(event.target.value);
  };
  const onCancel = () => {
    history.push("/admin/items");
  };

  const saveItem = (event) => {
    event.preventDefault();
    let item = { name, category, latest, image_url, cost, discount, type };
    console.log(item);
    if (id === "_add") {
      ItemService.addItem(item).then((res) => history.push("/admin/items"));
    } else {
      ItemService.updateItem(item, id).then((res) =>
        history.push("/admin/items")
      );
    }
  };
  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Name: </label>
                  <input
                    placeholder="Name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={changeNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Category: </label>
                  <input
                    placeholder="Category"
                    name="category"
                    className="form-control"
                    value={category}
                    onChange={changeCategoryHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Latest: </label>
                  <input
                    placeholder="Latest"
                    name="latest"
                    className="form-control"
                    value={latest}
                    onChange={changeLatestHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Image URL: </label>
                  <input
                    placeholder="Image URL"
                    name="image_url"
                    className="form-control"
                    value={image_url}
                    onChange={changeImage_urlHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Cost: </label>
                  <input
                    placeholder="Cost"
                    name="cost"
                    className="form-control"
                    value={cost}
                    onChange={changeCostHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Discount: </label>
                  <input
                    placeholder="Discount"
                    name="discount"
                    className="form-control"
                    value={discount}
                    onChange={changeDiscountHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Type: </label>
                  <input
                    placeholder="Type"
                    name="type"
                    className="form-control"
                    value={type}
                    onChange={changeTypeHandler}
                  />
                </div>

                <button className="btn btn-success" onClick={saveItem}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={onCancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
