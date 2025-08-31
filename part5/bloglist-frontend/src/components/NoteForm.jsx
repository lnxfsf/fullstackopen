const NoteForm = ({ createNote }) => {
  return (
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
  );
};

export default NoteForm;
