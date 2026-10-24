import EventCard from '@/components/EventCard';
import FilterPanel from '@/components/FilterPanel';
import NewEventsCard from '@/components/NewEventCard';
import { baseUrl } from '@/lib/api/baseUrl';
import React, { Suspense } from 'react';
const fetchEvents = async () => {
    const res = await fetch(`${baseUrl}/api/events`)
    const data = await res.json()
    return data;
}
const EventsPage = async () => {
    const events = await fetchEvents()
    console.log(events);
    return (
        <div className='w-11/12 mx-auto'>
            <Suspense fallback={<div className='h-28 w-full glass animate-pulse rounded-2xl'>
                
            </div>}>
                <FilterPanel/>
            </Suspense>
            <Suspense fallback={
                <div className="flex min-h-[50vh] items-center justify-center">
                    <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-pink-500 border-r-indigo-500" />
                </div>
            }>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
                    {events.map((event) => (
                        <div key={event._id}>
                            <EventCard event={event} buttonText="Book Ticket" />
                        </div>
                    ))}
                </div>
            </Suspense>

        </div>
    );
};

export default EventsPage;