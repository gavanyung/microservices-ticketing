import { OrderCancelledEvent, Publisher, Subjects } from "@gytickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
