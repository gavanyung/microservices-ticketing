import { Publisher, Subjects, TicketCreatedEvent } from "@gytickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
