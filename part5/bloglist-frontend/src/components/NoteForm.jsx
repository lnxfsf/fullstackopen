const NoteForm = ({ createNote }) => {
  const newNote = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    const newBlog = {
      title,
      author,
      url,
    };

    createNote(newBlog);
  };

  return (
    <form onSubmit={newNote}>
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
  );
};

export default NoteForm;
