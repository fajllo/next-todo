import React from "react";
// import { docs } from "../lib/fiebase";
import { Input, Grid, Button, Loading } from "@nextui-org/react";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../lib/fiebase";

function TodoList() {
  // const data = docs.map(doc => {
  //   return { ...doc.data(), id: doc.id };
  // });
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const [inputs, setInputs] = useState({});
  const [del, setDel] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleDelChange = event => {
    const value = event.target.value;
    setDel(value);
  };

  const handleDel = async e => {
    e.preventDefault();
    setLoadingDel(true);
    try {
      const docRef = doc(db, "books", del);
      await deleteDoc(docRef);
      setDel("");
    } catch (e) {
      console.log(e);
    }

    setLoadingDel(false);
  };

  const handleAdd = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const colRef = collection(db, "books");
      await addDoc(colRef, {
        title: inputs.title,
        author: inputs.author,
      });
      setInputs(values => ({ ...values, title: "", author: "" }));
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
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

            <Grid xs={6}>
              <Button color="success" auto>
                Add
              </Button>
            </Grid>
            {loading ? (
              <Grid xs={6}>
                <Loading color="success" />
              </Grid>
            ) : (
              <Grid xs={6}></Grid>
            )}
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
                onChange={handleDelChange}
                value={del}
              />
            </Grid>

            <Grid xs={6}>
              <Button color="error" auto>
                Delete
              </Button>
            </Grid>
            {loadingDel ? (
              <Grid xs={6}>
                <Loading color="error" />
              </Grid>
            ) : (
              <Grid xs={6}></Grid>
            )}
          </Grid.Container>
        </form>
      </div>
    </div>
  );
}

export default TodoList;
