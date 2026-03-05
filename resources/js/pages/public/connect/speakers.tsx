import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PublicLayout from '@/layouts/public-layout';
import type { Speaker } from '@/types';
import { router } from '@inertiajs/react';
import { ExternalLinkIcon } from 'lucide-react';

interface Props {
    speakers: Speaker[];
    semesters: string[];
    currentSemester: string;
}

export default function Speakers({ speakers, semesters, currentSemester }: Props) {
    // Group speakers by event_date
    const grouped = speakers.reduce<Record<string, Speaker[]>>((acc, speaker) => {
        const date = speaker.event_date ?? 'TBD';
        if (!acc[date]) acc[date] = [];
        acc[date].push(speaker);
        return acc;
    }, {});

    return (
        <PublicLayout title="Speaker Events">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Speaker Events</h1>
                        <p className="mt-1 text-muted-foreground">Upcoming speaker events and presentations.</p>
                    </div>
                    {semesters.length > 0 && (
                        <Select value={currentSemester} onValueChange={(val) => router.get('/connect/speakers', { semester: val }, { preserveState: true })}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filter by semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Semesters</SelectItem>
                                {semesters.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                <div className="mt-10 space-y-8">
                    {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([date, dateSpeakers]) => (
                        <div key={date}>
                            <h2 className="text-lg font-semibold border-b pb-2">
                                {date === 'TBD' ? 'Date TBD' : new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </h2>
                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                {dateSpeakers.map((speaker) => (
                                    <div key={speaker.id} className="rounded-lg border p-4">
                                        <div className="flex items-start gap-4">
                                            {speaker.photo_path && (
                                                <img src={`/storage/${speaker.photo_path}`} alt={speaker.name} className="size-16 rounded-full object-cover" />
                                            )}
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{speaker.name}</h3>
                                                {speaker.title && <p className="text-sm text-muted-foreground">{speaker.title}</p>}
                                                {speaker.event_time && <p className="mt-1 text-sm">Time: {speaker.event_time}</p>}
                                                {speaker.bio && <p className="mt-2 text-sm text-muted-foreground">{speaker.bio}</p>}
                                                {speaker.event_link && (
                                                    <Button asChild variant="outline" size="sm" className="mt-3">
                                                        <a href={speaker.event_link} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLinkIcon className="size-4" /> Join Event
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {speakers.length === 0 && (
                    <p className="mt-10 text-center text-muted-foreground">No speaker events scheduled for this period.</p>
                )}
            </div>
        </PublicLayout>
    );
}
