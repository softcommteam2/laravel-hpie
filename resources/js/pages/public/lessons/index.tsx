import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PublicLayout from '@/layouts/public-layout';
import type { PaginatedData, Lesson } from '@/types';
import { Link, router } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    lessons: PaginatedData<Lesson>;
    search: string;
}

export default function LessonsIndex({ lessons, search }: Props) {
    const [query, setQuery] = useState(search || '');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get('/lessons', { search: query }, { preserveState: true });
    }

    return (
        <PublicLayout title="Lessons">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Lessons</h1>
                        <p className="mt-1 text-muted-foreground">Explore our health professions education lessons.</p>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search lessons..."
                            className="w-64"
                        />
                        <Button type="submit" variant="outline" size="icon">
                            <SearchIcon className="size-4" />
                        </Button>
                    </form>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {lessons.data.map((lesson) => (
                        <Link key={lesson.id} href={`/lessons/${lesson.slug}`} className="group rounded-lg border transition-shadow hover:shadow-md">
                            {lesson.thumbnail_path ? (
                                <img src={`/storage/${lesson.thumbnail_path}`} alt={lesson.title} className="h-48 w-full rounded-t-lg object-cover" />
                            ) : (
                                <div className="flex h-48 items-center justify-center rounded-t-lg bg-muted">
                                    <span className="text-4xl text-muted-foreground">📚</span>
                                </div>
                            )}
                            <div className="p-4">
                                <h3 className="font-semibold group-hover:text-primary">{lesson.title}</h3>
                                {lesson.description && (
                                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{lesson.description}</p>
                                )}
                                {lesson.author_name && (
                                    <p className="mt-2 text-xs text-muted-foreground">By {lesson.author_name}</p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {lessons.data.length === 0 && (
                    <p className="mt-10 text-center text-muted-foreground">No lessons found.</p>
                )}

                {/* Pagination */}
                {lessons.last_page > 1 && (
                    <div className="mt-10 flex justify-center gap-2">
                        {lessons.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                asChild={!!link.url}
                            >
                                {link.url ? (
                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
