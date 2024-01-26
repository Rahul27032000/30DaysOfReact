import React from "react";
import { Card, Typography } from "@mui/material";
import { IPosts } from "./AppBar";

const Post: React.FC<IPosts> = ({ title, body }) => {
  return (
    <div>
      <Card
        style={{ width: "280px", padding: "20px", margin: "10px" }}
        variant="outlined"
      >
        <Typography>
          {title}
          {body}
        </Typography>
      </Card>
    </div>
  );
};

export default Post;
