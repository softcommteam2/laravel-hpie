import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { Partner } from '@/types';
import { Link, router } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';

interface Props {
    partners: Partner[];
}

export default function PartnersIndex({ partners }: Props) {
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this partner?')) {
            router.delete(`/admin/partners/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Partners', href: '/admin/partners' }]}>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Partners</h1>
                    <Button asChild>
                        <Link href="/admin/partners/create"><PlusIcon className="size-4" /> Add Partner</Link>
                    </Button>
                </div>
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {partners.map((partner) => (
                            <TableRow key={partner.id}>
                                <TableCell className="font-medium">{partner.name}</TableCell>
                                <TableCell>{partner.contact_email}</TableCell>
                                <TableCell>{partner.is_active ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{partner.sort_order}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button asChild variant="ghost" size="icon">
                                            <Link href={`/admin/partners/${partner.id}/edit`}><PencilIcon className="size-4" /></Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(partner.id)}>
                                            <TrashIcon className="size-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {partners.length === 0 && <p className="mt-4 text-center text-muted-foreground">No partners yet.</p>}
            </div>
        </AppLayout>
    );
}
