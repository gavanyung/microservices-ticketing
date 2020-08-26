import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@gytickets/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete;
}
