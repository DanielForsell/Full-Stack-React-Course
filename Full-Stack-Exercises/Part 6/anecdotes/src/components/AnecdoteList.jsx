import { useNotes, useNotesActions } from "../store";

const AnecdoteList = () => {
  const notes = useNotes();
  const { addVotes } = useNotesActions();
  const sortedNotes = notes.toSorted((a, b) => b.vote - a.vote);

  return (
    <ul>
      {sortedNotes.map((note) => (
        <li key={note.id}>
          {note.content}
          <button onClick={() => addVotes(note.id)}>vote {note.vote}</button>
        </li>
      ))}
    </ul>
  );
};

export default AnecdoteList;
