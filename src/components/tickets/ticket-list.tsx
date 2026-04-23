import { useQuery } from "@tanstack/react-query";
import { fetchTickets } from "@/services/ticket-service";
import { TicketCard } from "./ticket-card";

export const TicketList = () => {
  const { data: tickets, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
  });

  if (isLoading) return <div>Loading tickets...</div>;

  return (
    <div className="grid gap-4">
      {tickets?.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
