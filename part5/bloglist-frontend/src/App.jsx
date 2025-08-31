import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./main.css";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const UserJSON = window.localStorage.getItem("user");
    if (UserJSON) {
      const user = JSON.parse(UserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");

      console.log("credentials", user);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);

      setMessage("Login successful");
      setIsError(false);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch {
      setMessage("wrong credentials");
      setIsError(true);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const createNote = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));

      event.target.title.value = "";
      event.target.author.value = "";
      event.target.url.value = "";

      setMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setIsError(false);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (e) {
      console.log(e);
      setMessage("Error creating blog");
      setIsError(true);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const logOut = async () => {
    window.localStorage.removeItem("user");
    setUser(null);
    setMessage("Logged out successfully");
    setIsError(false);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  return (
    <div>
      {message && (
        <div className={`message ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}

      {!user && loginForm()}

      {user && (
        <div>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={logOut}>LogOut</button>
          </div>

          <div>
           <Togglable buttonLabel="Create new blog">
            <form onSubmit={createNote}>
              <div>
                title:
                <input type="text" name="title" />
              </div>
              <div>
                <div>
                  author:
                  <input type="text" name="author" />
                </div>
                <div>
                  url:
                  <input type="text" name="url" />
                </div>
                <button type="submit">create</button>
              </div>
            </form>
</Togglable>
          </div>

          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
