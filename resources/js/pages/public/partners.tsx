import PublicLayout from '@/layouts/public-layout';
import type { Partner } from '@/types';
import { ExternalLinkIcon, MailIcon, PhoneIcon } from 'lucide-react';

interface Props {
    partners: Partner[];
}

export default function Partners({ partners }: Props) {
    return (
        <PublicLayout title="Partners">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold">Our Partners</h1>
                <p className="mt-2 text-muted-foreground">Organizations collaborating with HPIE International.</p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {partners.map((partner) => (
                        <div key={partner.id} className="rounded-lg border p-6">
                            {partner.logo_path && (
                                <img src={`/storage/${partner.logo_path}`} alt={partner.name} className="mb-4 h-16 object-contain" />
                            )}
                            <h3 className="text-lg font-semibold">{partner.name}</h3>
                            {partner.description && <p className="mt-2 text-sm text-muted-foreground">{partner.description}</p>}
                            <div className="mt-4 space-y-1">
                                {partner.contact_email && (
                                    <a href={`mailto:${partner.contact_email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                                        <MailIcon className="size-4" /> {partner.contact_email}
                                    </a>
                                )}
                                {partner.contact_phone && (
                                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <PhoneIcon className="size-4" /> {partner.contact_phone}
                                    </span>
                                )}
                                {partner.website_url && (
                                    <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                        <ExternalLinkIcon className="size-4" /> Visit Website
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {partners.length === 0 && (
                    <p className="mt-10 text-center text-muted-foreground">No partners to display at this time.</p>
                )}
            </div>
        </PublicLayout>
    );
}
