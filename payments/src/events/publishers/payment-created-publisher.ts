import { Subjects, Publisher, PaymentCreatedEvent } from "@gytickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
