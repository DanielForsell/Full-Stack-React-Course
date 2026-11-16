import { create } from "zustand";

const useNotesStore = create((set) => ({
  notes: [
    {
      id: 1,
      content: "If it hurts, do it more often.",
      vote: 0
    },
    {
      id: 2,
      content: "Adding manpower to a late software project makes it later!",
      vote: 0
    },
    {
      id: 3,
      content: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      vote: 0
    },
    {
      id: 4,
      content: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      vote: 0
    },
    {
      id: 5,
      content: "Premature optimization is the root of all evil.",
      vote: 0
    },
    {
      id: 6,
      content: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      vote: 0
    },
    {
      id: 7,
      content: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
      vote: 0
    },
    {
      id: 8,
      content: "The only way to go fast, is to go well.",
      vote: 0
    }
  ],
  actions: {
    addNotes: note => set(state => ({ notes: [...state.notes, note] })),
    addVotes: id => set(state => ({ notes: state.notes.map(note => note.id === id ? {...note, vote: note.vote + 1 } : note)})),
  }
}))


export const useNotes = () => useNotesStore(state => state.notes)
export const useNotesActions = () => useNotesStore(state => state.actions)
