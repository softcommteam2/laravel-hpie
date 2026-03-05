import { Link } from '@inertiajs/react';
import { BookOpenIcon, AwardIcon, UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import type { Page } from '@/types';

interface Props {
    page: Page;
}

export default function Home({ page }: Props) {
    return (
        <PublicLayout title="Home">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{page.title}</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{page.content}</p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/lessons">Browse Lessons</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/about-certificate">Learn About Certificate</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-lg border p-6 text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                                <BookOpenIcon className="size-6 text-primary" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">Interactive Lessons</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Explore our comprehensive library of health professions education lessons with video content and activities.
                            </p>
                            <Button asChild variant="link" className="mt-4">
                                <Link href="/lessons">View Lessons</Link>
                            </Button>
                        </div>
                        <div className="rounded-lg border p-6 text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                                <AwardIcon className="size-6 text-primary" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">Earn a Certificate</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Complete all lessons and apply for the HPIE Certificate to demonstrate your commitment to interprofessional education.
                            </p>
                            <Button asChild variant="link" className="mt-4">
                                <Link href="/about-certificate">Learn More</Link>
                            </Button>
                        </div>
                        <div className="rounded-lg border p-6 text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                                <UsersIcon className="size-6 text-primary" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">Connect with Experts</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Schedule one-on-one sessions, attend speaker events, and connect with HPIE professionals.
                            </p>
                            <Button asChild variant="link" className="mt-4">
                                <Link href="/connect/one-on-one">Connect</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
