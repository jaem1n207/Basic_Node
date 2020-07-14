import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      console.log(res);
      alert(res.data);
    });
  }, []);

  return <div>랜딩페이지</div>;
}

export default LandingPage;
