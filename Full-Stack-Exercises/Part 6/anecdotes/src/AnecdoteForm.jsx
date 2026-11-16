import { useNotesActions } from "./store";

const AnecdoteForm = () => {
  const { addNotes } = useNotesActions();
  const random = () => Number((Math.random() * 1000000).toFixed(0));

  const addNote = (e) => {
    e.preventDefault();
    const vote = 0;
    const content = e.target.note.value;
    addNotes({ id: random(), content, vote });
    e.target.reset();
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
