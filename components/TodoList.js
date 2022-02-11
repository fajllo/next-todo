import React from "react";
// import { docs } from "../lib/fiebase";
import { Input, Grid, Button, Loading, Text, Card } from "@nextui-org/react";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db, colRef } from "../lib/fiebase";

const TodoList = () => {
  const data = null;
  const queryData = null;
  const [bookItems, setBooksItems] = useState([]);
  const [queryBookItems, setQueryBooksItems] = useState([]);
  useEffect(async () => {
    // query
    const q = query(
      colRef,
      where("title", "==", "test"),
      orderBy("createdAt", "asc")
    );
    queryData = onSnapshot(q, snap => {
      const books = snap.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      setQueryBooksItems(
        books.map(book => {
          return <BookItem key={book.id} book={book} />;
        })
      );
    });
    // real time
    data = onSnapshot(colRef, snap => {
      const books = snap.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      setBooksItems(
        books.map(book => {
          return <BookItem key={book.id} book={book} />;
        })
      );
    });
  }, [data]);

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
        createdAt: serverTimestamp(),
      });
      setInputs(values => ({ ...values, title: "", author: "" }));
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <div className="TodoList flex">
      <p>
        this is boiler plate app for next js and firebase, I used NextUI as a
        component library but, i dont like it. Only tailwind CSS!!
      </p>
      <div className="add flex">
        <form onSubmit={handleAdd}>
          {" "}
          <h1>Add your to do</h1>
          <Grid.Container gap={2} justify="center">
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
      <Grid.Container gap={2}>
        <h1>this is real time list of all items</h1>
        {bookItems}
      </Grid.Container>
      <Grid.Container gap={2}>
        <h1>this will be the query list where title == test</h1>
        {queryBookItems}
      </Grid.Container>
    </div>
  );
};

function BookItem(bookItem) {
  const { book } = bookItem;
  return (
    <div className="BookItem">
      <Grid xs={12}>
        <Card color="warning" xs={12}>
          <Text transform="capitalize">{book.title}</Text>
          <Text transform="capitalize">{book.author}</Text>
          <Text transform="capitalize">id: {book.id}</Text>
        </Card>
      </Grid>
    </div>
  );
}

export default TodoList;
