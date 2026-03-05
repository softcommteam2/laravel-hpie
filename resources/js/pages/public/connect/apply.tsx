import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PublicLayout from '@/layouts/public-layout';

interface Props {
    totalLessons: number;
    completedLessons: number;
}

export default function ApplyForm({ totalLessons, completedLessons }: Props) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        institution: '',
        program: '',
        statement: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/connect/apply', { onSuccess: () => reset() });
    }

    return (
        <PublicLayout title="Apply for Certificate">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold">Apply for HPIE Certificate</h1>
                <p className="mt-2 text-muted-foreground">Complete the form below to apply for your certificate.</p>

                {/* Completion Progress */}
                <div className="mt-6 rounded-lg border p-4">
                    <p className="text-sm font-medium">
                        Lesson Completion: {completedLessons} / {totalLessons} lessons completed
                    </p>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={{ width: totalLessons > 0 ? `${(completedLessons / totalLessons) * 100}%` : '0%' }}
                        />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Enter your email below to see your personal progress. Complete all lessons to be eligible.
                    </p>
                </div>

                {wasSuccessful && (
                    <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
                        Your application has been submitted successfully! We will review it and get back to you.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" />
                            {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1" />
                            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="mt-1" />
                            {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
                        </div>
                        <div>
                            <Label htmlFor="institution">Institution</Label>
                            <Input id="institution" value={data.institution} onChange={(e) => setData('institution', e.target.value)} className="mt-1" />
                            {errors.institution && <p className="mt-1 text-sm text-destructive">{errors.institution}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="program">Program</Label>
                        <Input id="program" value={data.program} onChange={(e) => setData('program', e.target.value)} className="mt-1" />
                        {errors.program && <p className="mt-1 text-sm text-destructive">{errors.program}</p>}
                    </div>
                    <div>
                        <Label htmlFor="statement">Personal Statement</Label>
                        <Textarea id="statement" value={data.statement} onChange={(e) => setData('statement', e.target.value)} rows={5} className="mt-1" />
                        {errors.statement && <p className="mt-1 text-sm text-destructive">{errors.statement}</p>}
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </form>
            </div>
        </PublicLayout>
    );
}
