import { Link } from '@inertiajs/react';

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Lessons', href: '/lessons' },
    { label: 'Partners', href: '/partners' },
    { label: 'About Certificate', href: '/about-certificate' },
    { label: 'Give Feedback', href: '/connect/feedback' },
    { label: 'Apply for Certificate', href: '/connect/apply' },
];

export default function PublicFooter() {
    return (
        <footer className="border-t bg-gray-50 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="text-lg font-semibold">HPIE International</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Health Professions Interprofessional Education — bridging healthcare education and underserved communities worldwide.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
                        <ul className="mt-2 space-y-1">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
                        <ul className="mt-2 space-y-1">
                            <li>
                                <Link href="/connect/one-on-one" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    One-on-One Sessions
                                </Link>
                            </li>
                            <li>
                                <Link href="/connect/speakers" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                    Speaker Events
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} HPIE International. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
