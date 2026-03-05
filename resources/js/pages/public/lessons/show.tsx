import { router } from '@inertiajs/react';
import { CheckCircleIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PublicLayout from '@/layouts/public-layout';
import type { Lesson, LessonTranslation } from '@/types';

interface Props {
    lesson: Lesson;
    isCompleted: boolean;
}

export default function LessonShow({ lesson, isCompleted }: Props) {
    const [locale, setLocale] = useState('en');
    const [completed, setCompleted] = useState(isCompleted);

    const translation = useMemo(() => {
        if (locale === 'en') return null;
        return lesson.translations?.find((t: LessonTranslation) => t.locale === locale) ?? null;
    }, [locale, lesson.translations]);

    const title = translation?.title ?? lesson.title;
    const description = translation?.description ?? lesson.description;
    const activityContent = translation?.activity_content ?? lesson.activity_content;

    const availableLocales = useMemo(() => {
        const locales = [{ value: 'en', label: 'English' }];
        lesson.translations?.forEach((t: LessonTranslation) => {
            const labels: Record<string, string> = { es: 'Español', fr: 'Français', de: 'Deutsch', pt: 'Português', zh: '中文', ar: 'العربية' };
            locales.push({ value: t.locale, label: labels[t.locale] ?? t.locale.toUpperCase() });
        });
        return locales;
    }, [lesson.translations]);

    function renderVideo() {
        if (lesson.video_type === 'youtube' && lesson.video_url) {
            const videoId = lesson.video_url.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?/]+)/)?.[1];
            if (!videoId) return null;
            return (
                <iframe
                    className="aspect-video w-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            );
        }
        if (lesson.video_type === 'vimeo' && lesson.video_url) {
            const videoId = lesson.video_url.match(/vimeo\.com\/(\d+)/)?.[1];
            if (!videoId) return null;
            return (
                <iframe
                    className="aspect-video w-full rounded-lg"
                    src={`https://player.vimeo.com/video/${videoId}`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                />
            );
        }
        if (lesson.video_type === 'upload' && lesson.video_path) {
            return <video className="aspect-video w-full rounded-lg" src={`/storage/${lesson.video_path}`} controls />;
        }
        return null;
    }

    function handleMarkComplete() {
        const email = prompt('Enter your email to mark this lesson as complete:');
        if (!email) return;
        router.post(`/lessons/${lesson.slug}/complete`, { email }, {
            onSuccess: () => setCompleted(true),
        });
    }

    return (
        <PublicLayout title={title}>
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Language Toggle */}
                {availableLocales.length > 1 && (
                    <div className="mb-6 flex justify-end">
                        <Select value={locale} onValueChange={setLocale}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {availableLocales.map((l) => (
                                    <SelectItem key={l.value} value={l.value}>
                                        {l.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <h1 className="text-3xl font-bold">{title}</h1>
                {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}

                {/* Video */}
                <div className="mt-8">{renderVideo()}</div>

                {/* Author */}
                {lesson.author_name && (
                    <div className="mt-8 flex items-start gap-4 rounded-lg border p-4">
                        {lesson.author_photo_path && (
                            <img src={`/storage/${lesson.author_photo_path}`} alt={lesson.author_name} className="size-16 rounded-full object-cover" />
                        )}
                        <div>
                            <p className="font-semibold">{lesson.author_name}</p>
                            {lesson.author_bio && <p className="mt-1 text-sm text-muted-foreground">{lesson.author_bio}</p>}
                        </div>
                    </div>
                )}

                {/* Activity */}
                {activityContent && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold">Activity</h2>
                        <div className="prose dark:prose-invert mt-4 max-w-none whitespace-pre-line">{activityContent}</div>
                    </div>
                )}

                {/* Mark Complete */}
                <div className="mt-10 flex items-center gap-4 rounded-lg border p-4">
                    {completed ? (
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircleIcon className="size-5" />
                            <span className="font-medium">Lesson completed!</span>
                        </div>
                    ) : (
                        <Button onClick={handleMarkComplete}>Mark as Complete</Button>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
