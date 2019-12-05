import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>GloChat</h1>
      <Button className="m-4 w-25 p-2 text-white" variant="primary">
        <Link className="text-white" to="/signup">
          Signup
        </Link>
      </Button>
      <Button className="m-4 w-25 p-2" variant="primary">
        <Link className="text-white" to="/login">
          Login
        </Link>
      </Button>
    </div>
  );
};

export default Home;
