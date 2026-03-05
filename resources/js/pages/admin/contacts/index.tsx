import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { Contact } from '@/types';
import { Link, router } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';

interface Props {
    contacts: Contact[];
}

export default function ContactsIndex({ contacts }: Props) {
    function handleDelete(id: number) {
        if (confirm('Are you sure?')) router.delete(`/admin/contacts/${id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Contacts', href: '/admin/contacts' }]}>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Contacts</h1>
                    <Button asChild><Link href="/admin/contacts/create"><PlusIcon className="size-4" /> Add Contact</Link></Button>
                </div>
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell className="font-medium">{contact.name}</TableCell>
                                <TableCell>{contact.title}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.is_active ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button asChild variant="ghost" size="icon"><Link href={`/admin/contacts/${contact.id}/edit`}><PencilIcon className="size-4" /></Link></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(contact.id)}><TrashIcon className="size-4" /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {contacts.length === 0 && <p className="mt-4 text-center text-muted-foreground">No contacts yet.</p>}
            </div>
        </AppLayout>
    );
}
