import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

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
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
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

      event.target.Title.value = "";
      event.target.Author.value = "";
      event.target.Url.value = "";
    } catch (e) {

      setErrorMessage("Error creating blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logOut = async () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
      <p>{errorMessage}</p>
    </form>
  );

  return (
    <div>
      {!user && loginForm()}

      {user && (
        <div>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={logOut}>LogOut</button>
          </div>

          <div>
            <h2>Create new</h2>
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
