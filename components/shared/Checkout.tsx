import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { IEvent } from '@/lib/database/models/event.model';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';
import { jsPDF } from "jspdf";

loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// const generatePdf = () => {
//   const doc = new jsPDF();

//   doc.text("Hello world!", 10, 10);
//   doc.save("ffff.pdf");
// }

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {

  useEffect(() => {
    //Check to see if this is a redirect back from Checkout
     const query = new URLSearchParams(window.location.search);
     console.log('Order placed! You wi', window.location);

    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
      //generatePdf();
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
    console.log("hello world", query)

  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    }

    await checkoutOrder(order);
  }

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  )
}

export default Checkout