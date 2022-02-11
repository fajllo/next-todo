import React from "react";
import { docs } from "../lib/fiebase";

function TodoList() {
  let data = docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  console.log(data);

  return <div>TodoList</div>;
}

export default TodoList;
