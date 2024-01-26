import Card from "@mui/material/Card";
import { ITodos } from "./AppBar";

const Todo = ({ title, completed }: ITodos) => {
  return (
    <Card
      style={{ width: "280px", padding: "20px", margin: "10px" }}
      variant="outlined"
    >
      <h1>{title}</h1>
    </Card>
  );
};

export default Todo;
