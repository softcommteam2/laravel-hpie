import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { CertificateApplication } from '@/types';
import { Link, useForm } from '@inertiajs/react';

interface Props { application: CertificateApplication; }

export default function ApplicationShow({ application }: Props) {
    const { data, setData, patch, processing } = useForm({
        status: application.status,
        admin_notes: application.admin_notes ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        patch(`/admin/submissions/applications/${application.id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Submissions', href: '/admin/submissions' }, { title: 'Application', href: `/admin/submissions/applications/${application.id}` }]}>
            <div className="mx-auto max-w-2xl p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Application: {application.name}</h1>
                    <Badge>{application.status}</Badge>
                </div>
                <div className="mt-6 space-y-3">
                    <div><span className="font-medium">Email:</span> {application.email}</div>
                    <div><span className="font-medium">Phone:</span> {application.phone ?? '-'}</div>
                    <div><span className="font-medium">Institution:</span> {application.institution ?? '-'}</div>
                    <div><span className="font-medium">Program:</span> {application.program ?? '-'}</div>
                    <div><span className="font-medium">Date:</span> {new Date(application.created_at).toLocaleString()}</div>
                    <div>
                        <span className="font-medium">Statement:</span>
                        <div className="mt-1 rounded border p-4 whitespace-pre-line">{application.statement}</div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4 border-t pt-6">
                    <h2 className="text-lg font-semibold">Update Status</h2>
                    <div>
                        <Label>Status</Label>
                        <Select value={data.status} onValueChange={(val) => setData('status', val as typeof data.status)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewing">Reviewing</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="denied">Denied</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Admin Notes</Label>
                        <Textarea value={data.admin_notes} onChange={(e) => setData('admin_notes', e.target.value)} rows={4} />
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Update'}</Button>
                        <Button asChild variant="outline"><Link href="/admin/submissions">Back</Link></Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
