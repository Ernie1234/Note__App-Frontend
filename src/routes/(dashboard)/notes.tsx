import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";

import { getAllNotes } from "@/services/note";
import NoteCard from "@/components/notes/NoteCard";

const notesQueryOptions = queryOptions({
  queryKey: ["getNotes"],
  queryFn: () => getAllNotes(),
  refetchInterval: 60 * 1000,
});

export const Route = createFileRoute("/(dashboard)/notes")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(notesQueryOptions),
  component: NotesComponent,
});

function NotesComponent() {
  const { data: notes, error, isLoading } = useQuery(notesQueryOptions);

  if (isLoading) {
    return <div>Loading your notes...</div>; // Loading state
  }

  if (error) {
    return <div>Error fetching notes: {error.message}</div>; // Error handling
  }

  if (!notes || notes.length === 0) {
    return <div>No notes available.</div>;
  }

  console.log(notes);

  return (
    <div className="h-full min-h-dvh">
      <h1>Notes</h1>
      <div className="flex flex-wrap items-center gap-4 p-5">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
