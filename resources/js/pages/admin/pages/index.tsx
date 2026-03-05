import { Link } from '@inertiajs/react';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { Page } from '@/types';

interface Props { pages: Page[]; }

export default function PagesIndex({ pages }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Pages', href: '/admin/pages' }]}>
            <div className="p-6">
                <h1 className="text-2xl font-bold">CMS Pages</h1>
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Slug</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pages.map((page) => (
                            <TableRow key={page.id}>
                                <TableCell className="font-mono text-sm">{page.slug}</TableCell>
                                <TableCell className="font-medium">{page.title}</TableCell>
                                <TableCell>{new Date(page.updated_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button asChild variant="ghost" size="icon">
                                        <Link href={`/admin/pages/${page.id}/edit`}><PencilIcon className="size-4" /></Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
