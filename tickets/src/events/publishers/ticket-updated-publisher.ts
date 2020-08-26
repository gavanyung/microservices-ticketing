import { Publisher, Subjects, TicketUpdatedEvent } from "@gytickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
