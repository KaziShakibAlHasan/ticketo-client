
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

export default function BookingWidget({
  event = {},
  ticketPrice = 49.99,
  availableSeats = 120,
}) {
  const [quantity, setQuantity] = useState(1);

  const price = Number(event.price ?? event.ticketPrice ?? ticketPrice);
  const seats = Number(
    event.availableSeats ?? event.capacity ?? availableSeats
  );

  const isSoldOut = seats <= 0;
  const totalPrice = price * quantity;

  const handleBooking = () => {
    alert(
      `Booking Summary\nEvent: ${event.title}\nTickets: ${quantity}\nTotal: ${
        price === 0 ? "Free" : `$${totalPrice.toFixed(2)}`
      }`
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Event Details */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 lg:col-span-2">
            {event.banner && (
              <img
                src={event.banner}
                alt={event.title || "Event banner"}
                className="h-64 w-full object-cover sm:h-96"
              />
            )}

            <div className="space-y-5 p-6">
              <span className="inline-block rounded-full bg-pink-500/10 px-3 py-1 text-sm font-semibold text-pink-400">
                {event.category || "Event"}
              </span>

              <h1 className="text-3xl font-bold sm:text-4xl">
                {event.title || "Event Details"}
              </h1>

              <p className="leading-7 text-slate-400">
                {event.description || "No description available."}
              </p>

              <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Date</p>
                  <p className="mt-1 text-slate-200">
                    📅 {event.date || "Date not available"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="mt-1 text-slate-200">
                    📍 {event.location || "Location not available"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Ticket Price</p>
                  <p className="mt-1 text-xl font-bold text-pink-400">
                    {price === 0 ? "Free" : `$${price.toFixed(2)}`}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Available Seats</p>
                  <p className="mt-1 text-slate-200">{seats}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="mb-2 text-2xl font-bold">Book Your Tickets</h2>

              <p className="mb-6 text-sm text-slate-400">
                Select the number of tickets you want to book.
              </p>

              {isSoldOut ? (
                <p className="rounded-lg bg-red-500/10 p-4 text-center font-semibold text-red-400">
                  Tickets Sold Out
                </p>
              ) : (
                <>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-slate-300">Quantity</span>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((prev) => Math.max(1, prev - 1))
                        }
                        disabled={quantity <= 1}
                        className="h-9 w-9 rounded-lg border border-white/10 disabled:opacity-40"
                      >
                        -
                      </button>

                      <span className="min-w-5 text-center font-bold">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((prev) =>
                            Math.min(seats, prev + 1)
                          )
                        }
                        disabled={quantity >= seats}
                        className="h-9 w-9 rounded-lg border border-white/10 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/10 py-5">
                    <div className="flex justify-between text-slate-400">
                      <span>Price per ticket</span>
                      <span>
                        {price === 0 ? "Free" : `$${price.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-pink-400">
                        {price === 0 ? "Free" : `$${totalPrice.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleBooking}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-5 py-3 font-semibold text-white transition hover:bg-pink-600"
                  >
                    <FaCheck />
                    Book Tickets
                  </button>

                  <p className="mt-4 text-center text-xs text-slate-500">
                    Booking confirmation will be shown after submission.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}