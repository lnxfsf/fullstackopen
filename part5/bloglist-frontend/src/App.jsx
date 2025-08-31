import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./main.css";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const noteFormRef = useRef()

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

  const createNote = (blogObject) => {
    
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setMessage(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        );
        setIsError(false);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        noteFormRef.current.toggleVisibility()
      })
      .catch((e) => {
        setMessage("Error creating blog");
        setIsError(true);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const updateBlog = async (id, updatedBlog) => {
    try {
      const response = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map(blog => blog.id === id ? response : blog));
    } catch (error) {
      console.error('Error updating blog:', error);
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
            <Togglable buttonLabel="Create new blog" ref={noteFormRef}>
              <NoteForm createNote={createNote} />
            </Togglable>
          </div>

          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog 
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
