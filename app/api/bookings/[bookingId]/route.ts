import { NextResponse } from "next/server";

import { getBooking } from "@/lib/data/mock-bookings";
import { bookingResponseSchema } from "@/lib/validation/booking.schema";

type BookingRouteProps = {
  params: Promise<{
    bookingId: string;
  }>;
};

export async function GET(_request: Request, { params }: BookingRouteProps) {
  try {
    const { bookingId } = await params;

    const booking = getBooking(bookingId);

    if (!booking) {
      return NextResponse.json(
        {
          message: "Booking not found.",
        },
        {
          status: 404,
        },
      );
    }

    const validatedBooking = bookingResponseSchema.parse(booking);

    return NextResponse.json(validatedBooking);
  } catch {
    return NextResponse.json(
      {
        message: "An unexpected error occurred.",
      },
      {
        status: 500,
      },
    );
  }
}
