// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        hello
        {import.meta.env.VITE_API_URL}
      </div>
    </>
  );
};

export default App;
