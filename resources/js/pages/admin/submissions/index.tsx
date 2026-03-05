import { Link } from '@inertiajs/react';
import { EyeIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { CertificateApplication, Feedback } from '@/types';

interface Props {
    feedbacks: Feedback[];
    applications: CertificateApplication[];
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'secondary',
    reviewing: 'outline',
    approved: 'default',
    denied: 'destructive',
};

export default function SubmissionsIndex({ feedbacks, applications }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Submissions', href: '/admin/submissions' }]}>
            <div className="p-6 space-y-10">
                {/* Feedbacks */}
                <section>
                    <h2 className="text-xl font-bold">Feedback ({feedbacks.length})</h2>
                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Read</TableHead>
                                <TableHead className="w-16">View</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feedbacks.map((fb) => (
                                <TableRow key={fb.id}>
                                    <TableCell className={!fb.is_read ? 'font-semibold' : ''}>{fb.name}</TableCell>
                                    <TableCell>{fb.subject}</TableCell>
                                    <TableCell>{new Date(fb.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>{fb.is_read ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <Button asChild variant="ghost" size="icon">
                                            <Link href={`/admin/submissions/feedbacks/${fb.id}`}><EyeIcon className="size-4" /></Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>

                {/* Applications */}
                <section>
                    <h2 className="text-xl font-bold">Certificate Applications ({applications.length})</h2>
                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Institution</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="w-16">View</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.name}</TableCell>
                                    <TableCell>{app.email}</TableCell>
                                    <TableCell>{app.institution}</TableCell>
                                    <TableCell><Badge variant={statusColors[app.status]}>{app.status}</Badge></TableCell>
                                    <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button asChild variant="ghost" size="icon">
                                            <Link href={`/admin/submissions/applications/${app.id}`}><EyeIcon className="size-4" /></Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            </div>
        </AppLayout>
    );
}
