import React from "react";
import { docs } from "../lib/fiebase";
import { Input, Grid, Button } from "@nextui-org/react";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

function TodoList() {
  let data = docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  console.log(data);

  const handleAdd = e => {
    e.preventDefault();

    const colRef = collection(getFirestore(), "books");
    addDoc(colRef, {
      title: "",
      author: "",
    });
  };
  const handleDel = e => {
    e.preventDefault();
    console.log("handle dell");
  };

  return (
    <div className="TodoList">
      <div className="add">
        <form>
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
              />
            </Grid>
            <Grid>
              <Button color="success" auto onSubmit={handleAdd}>
                Add
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </div>
      <div className="delete">
        <form>
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
              <Button color="error" auto onSubmit={handleDel}>
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
