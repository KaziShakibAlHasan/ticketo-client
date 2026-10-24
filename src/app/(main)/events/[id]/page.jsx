import BookingWidget from '@/components/BookingWidget';
import { baseUrl } from '@/lib/api/baseUrl';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
const fetchEvents = async (id) => {
    const res = await fetch(`${baseUrl}/api/single-events/${id}`)
    const data = await res.json()
    return data;
}

const EventsDetailsPage = async ({ params }) => {
    const { id } = await params;
    const event = await fetchEvents(id)
    console.log(event);
    const price = Number(event?.price || 0);
    const availableSeats = event?.availableSeats ?? event?.capacity ?? 0

    return (
        <div className='' >
            <main className="min-h-screen mx-auto  bg-slate-950 px-4 py-8 text-white">
                <div className="mx-auto max-w-7xl">

                    {/* Back Button */}
                    <Link
                        href="/events"
                        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-pink-500 hover:bg-white/5 hover:text-white"
                    >
                        <FaArrowLeft />
                        Back to Events
                    </Link>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

                        {/* Event Details Card */}
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 lg:col-span-2">
                            <img
                                src={event?.banner}
                                alt={'hello World'}
                                className="h-64 w-full object-cover sm:h-96"
                            />

                            <div className="space-y-5 p-6">
                                <span className="inline-block rounded-full bg-pink-500/10 px-3 py-1 text-sm font-semibold text-pink-400">
                                    {event?.category}
                                </span>

                                <h1 className="text-3xl font-bold sm:text-4xl">
                                    {event?.title}
                                </h1>

                                <p className="leading-7 text-slate-400">
                                    {event?.description}
                                </p>

                                <div className="grid gap-5 border-t border-white/10 pt-5 sm:grid-cols-2">
                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Event Date
                                        </p>
                                        <p className="mt-2 text-slate-200">
                                             {event?.date}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Location
                                        </p>
                                        <p className="mt-2 text-slate-200">
                                             {event?.location}
                                        </p>
                                    </div>

                                    {/* <div>
                                        <p className="text-sm text-slate-500">
                                            Ticket Price
                                        </p>
                                        <p className="mt-2 text-xl font-bold text-pink-400">
                                            {price === 0
                                                ? 'Free'
                                                : `$${price.toFixed(2)}`}
                                        </p>
                                    </div> */}

                                    {/* <div>
                                        <p className="text-sm text-slate-500">
                                            Total Capacity
                                        </p>
                                        <p className="mt-2 font-semibold text-slate-200">
                                            {availableSeats} Seats
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Booking Widget */}
                        <div className="lg:sticky lg:top-24">
                            {/* <BookingWidget/> */}
                            <BookingWidget/>
                        </div>

                    </div>
                </div>
            </main>
        </div>

    )
};

export default EventsDetailsPage;