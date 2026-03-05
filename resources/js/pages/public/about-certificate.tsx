import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import type { Page } from '@/types';

interface Props {
    page: Page;
}

export default function AboutCertificate({ page }: Props) {
    return (
        <PublicLayout title={page.title}>
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold">{page.title}</h1>
                <div className="prose dark:prose-invert mt-8 max-w-none">
                    <p className="text-lg text-muted-foreground whitespace-pre-line">{page.content}</p>
                </div>
                <div className="mt-10 flex gap-4">
                    <Button asChild>
                        <Link href="/lessons">Start Lessons</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/connect/apply">Apply for Certificate</Link>
                    </Button>
                </div>
            </div>
        </PublicLayout>
    );
}
