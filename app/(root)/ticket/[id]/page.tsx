import React from "react";
import Ticket from "@/components/shared/Ticket";
import { getEventById } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";

async function TicketPage({ params: { id }, searchParams }: SearchParamProps) {
  const event = await getEventById(id);

  return <Ticket event={event} />;
}

export default TicketPage;
