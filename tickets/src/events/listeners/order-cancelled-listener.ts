import { Listener, OrderCancelledEvent, Subjects } from "@gytickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    //Find the ticket
    const ticket = await Ticket.findById(data.ticket.id);
    //throw an error if no ticket
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    //update ticket
    ticket.set({ orderId: undefined });
    await ticket.save();

    //publish updated event
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      version: ticket.version,
    });

    //ack the mesage
    msg.ack();
  }
}
