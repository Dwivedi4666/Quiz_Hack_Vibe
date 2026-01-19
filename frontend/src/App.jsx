import { useEffect, useState } from "react";

import Button from "./Button";
import Card from "./Card";
import Header from "./Header";

function App() {
  const [dataObj, setDataObj] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => {
        setDataObj(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="main">
      <Header />
      <div className="container">
        {dataObj && <Card question={dataObj[0]} />}
        {dataObj && <Card question={dataObj[1]} />}
      </div>
      <Button />
    </div>
  );
}

export default App;
