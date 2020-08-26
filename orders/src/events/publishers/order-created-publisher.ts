import { OrderCreatedEvent, Publisher, Subjects } from "@gytickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
