import DashboardHeading from "@/components/DashboardHeading";
import { Button, Card } from "@heroui/react";
import {
    FaCalendarAlt,
    FaCrown,
    FaDollarSign,
    FaUsers,
} from "react-icons/fa";

const OrganizerOverviewPage = () => {
    const stats = {
        totalEvents: 15,
        totalAttendees: 450,
        totalRevenue: 25000,
        totalSoldTickets: 780,
    };

    const isPremium = false;

    return (<div className="mt-6 space-y-6">
            <DashboardHeading title={'Overview'} description={'Dashboard Overview'}/>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Total Events */} <Card className="glass border-white/5" radius="lg"> <div className="flex flex-row items-center justify-between p-6"> <div className="space-y-1"> <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Hosted Events </span> <h2 className="text-3xl font-extrabold text-white">
                    {stats.totalEvents} </h2> </div>

                ```
                <div className="rounded-2xl border border-pink-500/20 bg-pink-500/10 p-3.5 text-pink-400">
                    <FaCalendarAlt size={24} />
                </div>
            </div>
            </Card>

            {/* Total Ticket Sales */}
            <Card className="glass border-white/5" radius="lg">
                <div className="flex flex-row items-center justify-between p-6">
                    <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Total Ticket Sales
                        </span>
                        <h2 className="text-3xl font-extrabold text-white">
                            {stats.totalAttendees}
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-3.5 text-indigo-400">
                        <FaUsers size={24} />
                    </div>
                </div>
            </Card>

            {/* Total Revenue */}
            <Card className="glass border-white/5" radius="lg">
                <div className="flex flex-row items-center justify-between p-6">
                    <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Accumulated Revenue
                        </span>
                        <h2 className="text-3xl font-extrabold text-white">
                            ${stats.totalRevenue.toFixed(2)}
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-3.5 text-green-400">
                        <FaDollarSign size={24} />
                    </div>
                </div>
            </Card>
        </div>

        {/* Premium Upgrade */}
        {!isPremium && (
            <Card
                className="relative overflow-hidden border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent"
                radius="lg"
            >
                <div className="z-10 flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
                    <div className="space-y-2">
                        <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                            <FaCrown className="text-yellow-400" />
                            Unlock Unlimited Event Creation
                        </h3>

                        <p className="max-w-xl text-xs leading-relaxed text-slate-400">
                            Standard organizer accounts are limited to{" "}
                            <strong>3 events</strong>. Upgrade to our Premium Package for{" "}
                            <strong>$49.00</strong> to host unlimited events.
                        </p>
                    </div>

                    <Button
                        className="h-11 shrink-0 bg-yellow-500 px-6 font-bold text-slate-950 shadow-lg shadow-yellow-500/10 hover:bg-yellow-400"
                        radius="lg"
                    >
                        Upgrade to Premium
                    </Button>
                </div>
            </Card>
        )}
    </div>


    );
};

export default OrganizerOverviewPage;
