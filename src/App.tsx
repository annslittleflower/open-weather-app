// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import Weather from "./components/Weather";

const App = () => {
  // const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  return (
    <>
      <Weather />
    </>
  );
};

export default App;
