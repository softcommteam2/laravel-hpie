import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { Feedback } from '@/types';

interface Props { feedback: Feedback; }

export default function FeedbackShow({ feedback }: Props) {
    function markRead() {
        router.patch(`/admin/submissions/feedbacks/${feedback.id}/read`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Submissions', href: '/admin/submissions' }, { title: 'Feedback', href: `/admin/submissions/feedbacks/${feedback.id}` }]}>
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="text-2xl font-bold">Feedback from {feedback.name}</h1>
                <div className="mt-6 space-y-4">
                    <div><span className="font-medium">Email:</span> {feedback.email}</div>
                    <div><span className="font-medium">Subject:</span> {feedback.subject}</div>
                    <div><span className="font-medium">Date:</span> {new Date(feedback.created_at).toLocaleString()}</div>
                    <div className="rounded border p-4 whitespace-pre-line">{feedback.message}</div>
                    <div className="flex gap-2">
                        {!feedback.is_read && <Button onClick={markRead}>Mark as Read</Button>}
                        <Button asChild variant="outline"><Link href="/admin/submissions">Back</Link></Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
