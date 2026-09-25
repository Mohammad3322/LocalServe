import { NextResponse } from "next/server";

import { availability } from "@/lib/data/seed/availability";
import {
  BookingResponse,
  createBookingSchema,
} from "@/lib/validation/booking.schema";
import { services } from "@/lib/data/seed/services";

import { saveBooking } from "@/lib/data/mock-bookings";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = createBookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid booking data.",
          errors: result.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const booking = result.data;

    const service = services.find(
      (item) =>
        item.id === booking.serviceId && item.providerId === booking.providerId,
    );

    if (!service) {
      return NextResponse.json(
        {
          message: "The selected service is not available.",
        },
        {
          status: 404,
        },
      );
    }

    const slot = availability.find(
      (item) =>
        item.providerId === booking.providerId &&
        item.date === booking.date &&
        item.time === booking.time,
    );

    if (!slot || !slot.available) {
      return NextResponse.json(
        {
          message: "This time slot is no longer available.",
          code: "SLOT_UNAVAILABLE",
        },
        {
          status: 409,
        },
      );
    }

    const bookingId = crypto.randomUUID();

    const reference = `LS-${bookingId
      .replaceAll("-", "")
      .slice(0, 8)
      .toUpperCase()}`;

    const createdBooking: BookingResponse = {
      id: bookingId,
      reference,
      providerId: booking.providerId,
      serviceId: booking.serviceId,
      date: booking.date,
      time: booking.time,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      ...(booking.customerPhone
        ? {
            customerPhone: booking.customerPhone,
          }
        : {}),
      ...(booking.notes
        ? {
            notes: booking.notes,
          }
        : {}),
      status: "confirmed",
    };

    saveBooking(createdBooking);

    return NextResponse.json(createdBooking, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      {
        message: "An unexpected error occurred while creating the booking.",
      },
      {
        status: 500,
      },
    );
  }
}
