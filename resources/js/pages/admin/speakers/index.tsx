import { Link, router } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { Speaker } from '@/types';

interface Props { speakers: Speaker[]; }

export default function SpeakersIndex({ speakers }: Props) {
    function handleDelete(id: number) {
        if (confirm('Are you sure?')) router.delete(`/admin/speakers/${id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Speakers', href: '/admin/speakers' }]}>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Speakers</h1>
                    <Button asChild><Link href="/admin/speakers/create"><PlusIcon className="size-4" /> Add Speaker</Link></Button>
                </div>
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Event Date</TableHead>
                            <TableHead>Semester</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {speakers.map((speaker) => (
                            <TableRow key={speaker.id}>
                                <TableCell className="font-medium">{speaker.name}</TableCell>
                                <TableCell>{speaker.event_date ? new Date(speaker.event_date + 'T00:00:00').toLocaleDateString() : '-'}</TableCell>
                                <TableCell>{speaker.semester}</TableCell>
                                <TableCell>{speaker.is_active ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button asChild variant="ghost" size="icon"><Link href={`/admin/speakers/${speaker.id}/edit`}><PencilIcon className="size-4" /></Link></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(speaker.id)}><TrashIcon className="size-4" /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {speakers.length === 0 && <p className="mt-4 text-center text-muted-foreground">No speakers yet.</p>}
            </div>
        </AppLayout>
    );
}
