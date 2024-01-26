import React from "react";
import { Card } from "@mui/material";
import { IComments } from "./AppBar";

const Comment: React.FC<IComments> = ({ name }) => {
  return (
    <div>
      <Card
        style={{ width: "280px", padding: "20px", margin: "10px" }}
        variant="outlined"
      >
        <h1>{name}</h1>
      </Card>
    </div>
  );
};

export default Comment;
