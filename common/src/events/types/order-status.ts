export enum OrderStatus {
  //When the order has been created but the ticket is not reserved
  Created = "created",

  //When the ticket tries to reserve an already reserved ticket
  // OR the user cancels the order
  // OR the order expires before payment
  Cancelled = "cancelled",

  //the order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  //the user has paid successfully
  Complete = "complete",
}
