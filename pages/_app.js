import "../styles/globals.css";
import TodoList from "../components/TodoList";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <Component {...pageProps} />
      <TodoList />
    </NextUIProvider>
  );
}

export default MyApp;
