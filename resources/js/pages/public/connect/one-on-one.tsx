import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import type { Contact } from '@/types';
import { CalendarIcon, MailIcon } from 'lucide-react';

interface Props {
    contacts: Contact[];
}

export default function OneOnOne({ contacts }: Props) {
    return (
        <PublicLayout title="One-on-One Sessions">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold">One-on-One Sessions</h1>
                <p className="mt-2 text-muted-foreground">Schedule a personal session with one of our HPIE contacts.</p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="rounded-lg border p-6">
                            {contact.photo_path && (
                                <img src={`/storage/${contact.photo_path}`} alt={contact.name} className="mx-auto size-24 rounded-full object-cover" />
                            )}
                            <h3 className="mt-4 text-center text-lg font-semibold">{contact.name}</h3>
                            {contact.title && <p className="text-center text-sm text-muted-foreground">{contact.title}</p>}
                            {contact.bio && <p className="mt-3 text-sm text-muted-foreground">{contact.bio}</p>}
                            <div className="mt-4 flex flex-col gap-2">
                                {contact.calendly_url && (
                                    <Button asChild size="sm">
                                        <a href={contact.calendly_url} target="_blank" rel="noopener noreferrer">
                                            <CalendarIcon className="size-4" /> Schedule Meeting
                                        </a>
                                    </Button>
                                )}
                                {contact.email && (
                                    <Button asChild variant="outline" size="sm">
                                        <a href={`mailto:${contact.email}`}>
                                            <MailIcon className="size-4" /> Email
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {contacts.length === 0 && (
                    <p className="mt-10 text-center text-muted-foreground">No contacts available at this time.</p>
                )}
            </div>
        </PublicLayout>
    );
}
