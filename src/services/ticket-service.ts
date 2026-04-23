import { supabase } from "@/lib/supabase"; // Ensure this path matches your project structure

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  user_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  ticket_id: string;
  body: string;
  created_at: string;
}

/**
 * Fetch all tickets with optional filtering
 */
export const fetchTickets = async (status?: string) => {
  let query = supabase.from("tickets").select("*").order("created_at", { ascending: false });
  
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data as Ticket[];
};

/**
 * Fetch a single ticket by ID including comments
 */
export const getTicketById = async (id: string) => {
  const { data, error } = await supabase
    .from("tickets")
    .select("*, comments(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Update ticket status
 */
export const updateTicketStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from("tickets")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Add a new comment to a ticket
 */
export const addComment = async (ticketId: string, body: string) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ ticket_id: ticketId, body }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Comment;
};
