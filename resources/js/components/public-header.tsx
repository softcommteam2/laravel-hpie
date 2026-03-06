import { Link, usePage } from '@inertiajs/react';
import { MenuIcon } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Lessons', href: '/lessons' },
    { label: 'Partners', href: '/partners' },
    { label: 'Certificate', href: '/about-certificate' },
    { label: 'Connect', href: '/connect/one-on-one' },
    { label: 'Speakers', href: '/connect/speakers' },
];

export default function PublicHeader() {
    const { auth } = usePage().props;
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
    const isAdmin = !!(auth as { is_admin?: boolean })?.is_admin;

    return (
        <header className="border-b bg-white dark:bg-gray-950">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <AppLogoIcon className="h-11 w-auto max-w-[140px] object-contain" />
                    <span className="text-lg font-bold">HPIE International</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                                currentUrl === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    {auth.user && isAdmin ? (
                        <Button asChild variant="outline" size="sm">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    ) : (
                        <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
                            <Link href="/login">Login</Link>
                        </Button>
                    )}

                    {/* Mobile Nav */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <MenuIcon className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link href="/" className="flex items-center gap-2">
                                        <AppLogoIcon className="h-10 w-auto max-w-[120px] object-contain" />
                                        <span className="text-lg font-bold">HPIE</span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1 p-4">
                                {navLinks.map((link) => (
                                    <SheetClose asChild key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                                                currentUrl === link.href ? 'bg-accent text-accent-foreground' : ''
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </SheetClose>
                                ))}
                                {!auth.user && (
                                    <SheetClose asChild>
                                        <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                                            Login
                                        </Link>
                                    </SheetClose>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
