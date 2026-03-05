import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PublicLayout from '@/layouts/public-layout';

export default function FeedbackForm() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/connect/feedback', { onSuccess: () => reset() });
    }

    return (
        <PublicLayout title="Give Feedback">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold">Give Feedback</h1>
                <p className="mt-2 text-muted-foreground">We value your input. Share your thoughts with us.</p>

                {wasSuccessful && (
                    <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
                        Thank you for your feedback! We will review it shortly.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" />
                        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1" />
                        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                    </div>
                    <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)} className="mt-1" />
                        {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject}</p>}
                    </div>
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" value={data.message} onChange={(e) => setData('message', e.target.value)} rows={5} className="mt-1" />
                        {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Sending...' : 'Send Feedback'}
                    </Button>
                </form>
            </div>
        </PublicLayout>
    );
}
