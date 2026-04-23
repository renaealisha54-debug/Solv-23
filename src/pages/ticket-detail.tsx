import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTicketById, updateTicketStatus, addComment } from "@/services/ticket-service";
import { TopNav } from "@/components/layout/top-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id!),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (status: string) => updateTicketStatus(id!, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ticket", id] }),
  });

  if (isLoading) return <div>Loading ticket details...</div>;
  if (!ticket) return <div>Ticket not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">{ticket.title}</h2>
          <Select 
            defaultValue={ticket.status} 
            onValueChange={(val) => updateMutation.mutate(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{ticket.description}</p>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Activity</h3>
          {ticket.comments?.map((c: any) => (
            <Card key={c.id}>
              <CardContent className="py-4">{c.body}</CardContent>
            </Card>
          ))}
          
          <div className="flex gap-2">
            <textarea 
              className="flex-1 p-2 border rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a reply..."
            />
            <Button onClick={() => addComment(id!, comment)}>Post</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
