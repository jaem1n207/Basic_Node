import React, { useState, useEffect } from "react";
import axios from "axios";

function LoginPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("/api/data").then((res) => {
      console.log(res);
      console.log("response data: ", res.data);
      setData(res.data);
    });
  }, []);
  console.log("data: ", data);

  return (
    <div>
      <p>Login Page</p>
      <div>
        <p>{data.lastname}</p>
        <p>{data.firstname}</p>
      </div>
    </div>
  );
}

export default LoginPage;
