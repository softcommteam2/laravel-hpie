import PublicFooter from '@/components/public-footer';
import PublicHeader from '@/components/public-header';
import { Head } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';

interface PublicLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function PublicLayout({ title, children }: PublicLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen flex-col">
                <PublicHeader />
                <main className="flex-1">{children}</main>
                <PublicFooter />
            </div>
        </>
    );
}
