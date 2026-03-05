import { Link, router } from '@inertiajs/react';
import { SearchIcon, Share2Icon, BookmarkIcon, EyeIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PublicLayout from '@/layouts/public-layout';
import { cn } from '@/lib/utils';
import type { PaginatedData, Lesson } from '@/types';

interface Props {
    lessons: PaginatedData<Lesson>;
    search: string;
    subject: string;
    sort: string;
}

const SUBJECTS = [
    'The Arts',
    'Business & Economics',
    'Design/Engineering & Technology',
    'Health',
    'Literature & Language',
    'Mathematics',
    'Philosophy & Religion',
    'Psychology',
    'Science & Technology',
    'Social Studies',
];

const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'trending', label: 'Trending' },
    { value: 'newest', label: 'Newest' },
    { value: 'most_views', label: 'Most Views' },
];

export default function LessonsIndex({
    lessons,
    search,
    subject,
    sort,
}: Props) {
    const [query, setQuery] = useState(search || '');
    const [selectedSubject, setSelectedSubject] = useState(subject || '');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get(
            '/lessons',
            { search: query, subject: selectedSubject, sort },
            { preserveState: true },
        );
    }

    function handleSubjectChange(subj: string) {
        const newSubject = subj === selectedSubject ? '' : subj;
        setSelectedSubject(newSubject);
        router.get(
            '/lessons',
            { search, subject: newSubject, sort },
            { preserveState: true },
        );
    }

    function handleSortChange(newSort: string) {
        router.get(
            '/lessons',
            { search, subject: selectedSubject, sort: newSort },
            { preserveState: true },
        );
    }

    return (
        <PublicLayout title="Lessons">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Lessons</h1>
                    <p className="mt-1 text-muted-foreground">
                        Explore our health professions education lessons.
                    </p>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Filter Sidebar */}
                    <aside className="w-full shrink-0 lg:w-64">
                        <div className="rounded-lg border p-4">
                            <h2 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                Subjects
                            </h2>
                            <div className="space-y-1">
                                <button
                                    onClick={() => handleSubjectChange('')}
                                    className={cn(
                                        'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                                        !selectedSubject &&
                                            'bg-muted font-medium',
                                    )}
                                >
                                    All Subjects
                                </button>
                                {SUBJECTS.map((subj) => (
                                    <button
                                        key={subj}
                                        onClick={() =>
                                            handleSubjectChange(subj)
                                        }
                                        className={cn(
                                            'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                                            selectedSubject === subj &&
                                                'bg-muted font-medium',
                                        )}
                                    >
                                        {subj}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search and Sort */}
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <form
                                onSubmit={handleSearch}
                                className="flex gap-2"
                            >
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search lessons..."
                                    className="w-64"
                                />
                                <Button
                                    type="submit"
                                    variant="outline"
                                    size="icon"
                                >
                                    <SearchIcon className="size-4" />
                                </Button>
                            </form>

                            {/* Sort Tabs */}
                            <div className="flex gap-1 rounded-lg border p-1">
                                {SORT_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() =>
                                            handleSortChange(option.value)
                                        }
                                        className={cn(
                                            'rounded-md px-3 py-1.5 text-sm transition-colors',
                                            sort === option.value
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:text-foreground',
                                        )}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(selectedSubject || search) && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {selectedSubject && (
                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        {selectedSubject}
                                        <button
                                            onClick={() =>
                                                handleSubjectChange('')
                                            }
                                            className="ml-1 hover:text-destructive"
                                        >
                                            ×
                                        </button>
                                    </Badge>
                                )}
                                {search && (
                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        Search: {search}
                                        <button
                                            onClick={() => {
                                                setQuery('');
                                                router.get(
                                                    '/lessons',
                                                    {
                                                        subject:
                                                            selectedSubject,
                                                        sort,
                                                    },
                                                    { preserveState: true },
                                                );
                                            }}
                                            className="ml-1 hover:text-destructive"
                                        >
                                            ×
                                        </button>
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Lessons Grid */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {lessons.data.map((lesson) => (
                                <Link
                                    key={lesson.id}
                                    href={`/lessons/${lesson.slug}`}
                                    className="group relative flex flex-col overflow-hidden rounded-lg border transition-shadow hover:shadow-md"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video shrink-0">
                                        {lesson.thumbnail_path ? (
                                            <img
                                                src={`/storage/${lesson.thumbnail_path}`}
                                                alt={lesson.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-muted">
                                                <span className="text-4xl text-muted-foreground">
                                                    📚
                                                </span>
                                            </div>
                                        )}
                                        {/* Subject Tag */}
                                        {lesson.subject && (
                                            <Badge className="absolute top-2 left-2 bg-black/70 text-white hover:bg-black/80">
                                                {lesson.subject}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-4">
                                        <h3 className="line-clamp-2 font-semibold group-hover:text-primary">
                                            {lesson.title}
                                        </h3>
                                        {lesson.description && (
                                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                {lesson.description}
                                            </p>
                                        )}

                                        {/* Footer */}
                                        <div className="mt-auto flex items-center justify-between pt-3">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <EyeIcon className="size-3.5" />
                                                <span>
                                                    {lesson.view_count?.toLocaleString() ||
                                                        0}{' '}
                                                    views
                                                </span>
                                            </div>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                                                >
                                                    <BookmarkIcon className="size-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                                                >
                                                    <Share2Icon className="size-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {lessons.data.length === 0 && (
                            <p className="mt-10 text-center text-muted-foreground">
                                No lessons found.
                            </p>
                        )}

                        {/* Pagination */}
                        {lessons.last_page > 1 && (
                            <div className="mt-10 flex justify-center gap-2">
                                {lessons.links.map((link, i) => (
                                    <Button
                                        key={i}
                                        variant={
                                            link.active ? 'default' : 'outline'
                                        }
                                        size="sm"
                                        disabled={!link.url}
                                        asChild={!!link.url}
                                    >
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ) : (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
