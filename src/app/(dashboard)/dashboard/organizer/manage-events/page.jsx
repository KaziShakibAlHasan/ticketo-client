import DashboardHeading from "@/components/DashboardHeading";
import { myEvents } from "@/lib/api/events/data";
import { Spinner } from "@heroui/react";
import { headers } from "next/headers";
import { Suspense, Suspenss } from "react";
import ManageEventClient from "./ManageEventClient";
import { auth } from "@/lib/auth";

const ManageEvent = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const events = await myEvents(session?.user?.email)



    return (
        <div>
            <DashboardHeading
                title="Manage Event"
                description="Manage event"
            />
            <Suspense fallback={<Spinner />}>
                <ManageEventClient events={events} />
            </Suspense>

        </div>
    );
};

export default ManageEvent