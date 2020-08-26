import { Listener, Subjects, TicketUpdatedEvent } from "@gytickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { title, price } = data;

    // find ticket
    const ticket = await Ticket.findByEvent(data);
    // throw error if no ticket exists
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    //set updated attributes and save
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
