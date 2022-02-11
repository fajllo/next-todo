import React from "react";
// import { docs } from "../lib/fiebase";
import { Input, Grid, Button } from "@nextui-org/react";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

function TodoList() {
  // const data = docs.map(doc => {
  //   return { ...doc.data(), id: doc.id };
  // });
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const [inputs, setInputs] = useState({});
  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleDel = e => {
    e.preventDefault();
    console.log(inputs);
  };

  const handleAdd = async e => {
    e.preventDefault();
    const colRef = collection(getFirestore(), "books");
    await addDoc(colRef, {
      title: inputs.title,
      author: inputs.author,
    });
    setInputs(values => ({ ...values, title: "", author: "" }));
  };

  return (
    <div className="TodoList">
      <div className="add">
        <form onSubmit={handleAdd}>
          {" "}
          <h1>Add your to do</h1>
          <Grid.Container gap={2}>
            <Grid xs={6}>
              <Input
                name="title"
                rounded
                bordered
                label="title"
                placeholder="title"
                color="success"
                value={inputs.title || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={6}>
              <Input
                name="author"
                rounded
                bordered
                label="author"
                placeholder="author"
                color="success"
                value={inputs.author || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <Button color="success" auto>
                Add
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </div>
      <div className="delete">
        <form onSubmit={handleDel}>
          {" "}
          <h1>Delete your to do</h1>
          <Grid.Container gap={4} justify="center">
            <Grid xs={12}>
              <Input
                name="id"
                rounded
                bordered
                label="document id"
                placeholder="id"
                color="error"
              />
            </Grid>

            <Grid xs={12}>
              <Button color="error" auto>
                Delete
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </div>
    </div>
  );
}

export default TodoList;
