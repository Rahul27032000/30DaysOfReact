import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import Todo from "./Todo";
import Posts from "./Post";
import Comment from "./Comment";

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface ITodos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function CustomTabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = useState<[IPosts] | []>([]);
  const [comments, setComments] = useState<[IComments] | []>([]);
  const [todos, setTodos] = useState<[ITodos] | []>([]);

  useEffect(() => {
    const getFunction = async () => {
      const postsPromise = axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const commentsPromise = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const todosPromise = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const [reqPosts, reqComments, reqTodos] = await Promise.all([
        postsPromise,
        commentsPromise,
        todosPromise,
      ]);
      setPosts(reqPosts.data);
      setTodos(reqTodos.data);
      setComments(reqComments.data);
    };
    getFunction();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if (!(posts || comments || todos)) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Todos" {...a11yProps(0)} />
          <Tab label="comments" {...a11yProps(1)} />
          <Tab label="Posts" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {todos.map((todo) => (
            <Todo
              completed={todo.completed}
              id={todo.id}
              userId={todo.userId}
              title={todo.title}
              key={todo.id}
            />
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {comments.map((comment) => (
            <Comment
              name={comment.name}
              body={comment.body}
              key={comment.id}
              email={comment.email}
              postId={comment.postId}
              id={comment.id}
            />
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {posts.map((post) => (
            <Posts
              body={post.body}
              userId={post.userId}
              key={post.id}
              title={post.title}
              id={post.id}
            />
          ))}
        </div>
      </CustomTabPanel>
    </Box>
  );
}
