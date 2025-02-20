import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { INote } from "@/services/note";
import { Pencil } from "lucide-react";
import { format, parseISO } from "date-fns";

interface Props {
  note: INote;
}

function NoteCard({ note }: Props) {
  const formatDate = (dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  // Ensure note.updatedAt is a string
  const updatedAtString =
    typeof note.updatedAt === "string"
      ? note.updatedAt
      : note.updatedAt.toISOString();

  return (
    <Card className="border-none shadow bg-purple-200 min-w-[350px]">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{note.body}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-8">
        <p>{formatDate(updatedAtString)}</p>{" "}
        {/* Use the updatedAtString for formatting */}
        <div className="bg-gray-900 p-3 rounded-full">
          <Pencil className="text-white" size={16} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default NoteCard;
