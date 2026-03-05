import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Lesson } from '@/types';
import { useForm } from '@inertiajs/react';
import { PlusIcon, TrashIcon } from 'lucide-react';

interface TranslationForm {
    locale: string;
    title: string;
    description: string;
    activity_content: string;
}

interface Props {
    lesson: Lesson;
}

export default function LessonsEdit({ lesson }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: lesson.title,
        description: lesson.description ?? '',
        video_type: lesson.video_type,
        video_url: lesson.video_url ?? '',
        author_name: lesson.author_name ?? '',
        author_bio: lesson.author_bio ?? '',
        activity_content: lesson.activity_content ?? '',
        is_published: lesson.is_published,
        sort_order: lesson.sort_order,
        thumbnail: null as File | null,
        video_file: null as File | null,
        author_photo: null as File | null,
        translations: (lesson.translations ?? []).map((t) => ({
            locale: t.locale,
            title: t.title,
            description: t.description ?? '',
            activity_content: t.activity_content ?? '',
        })) as TranslationForm[],
    });

    function addTranslation() {
        setData('translations', [...data.translations, { locale: '', title: '', description: '', activity_content: '' }]);
    }

    function removeTranslation(index: number) {
        setData('translations', data.translations.filter((_, i) => i !== index));
    }

    function updateTranslation(index: number, field: keyof TranslationForm, value: string) {
        const updated = [...data.translations];
        updated[index] = { ...updated[index], [field]: value };
        setData('translations', updated);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/admin/lessons/${lesson.id}`, { forceFormData: true });
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Lessons', href: '/admin/lessons' }, { title: 'Edit', href: `/admin/lessons/${lesson.id}/edit` }]}>
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="text-2xl font-bold">Edit Lesson</h1>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                        {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title}</p>}
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </div>
                    <div>
                        <Label>Video Type</Label>
                        <Select value={data.video_type} onValueChange={(val) => setData('video_type', val as typeof data.video_type)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="youtube">YouTube</SelectItem>
                                <SelectItem value="vimeo">Vimeo</SelectItem>
                                <SelectItem value="upload">Upload</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {data.video_type !== 'upload' ? (
                        <div>
                            <Label htmlFor="video_url">Video URL</Label>
                            <Input id="video_url" value={data.video_url} onChange={(e) => setData('video_url', e.target.value)} />
                        </div>
                    ) : (
                        <div>
                            <Label htmlFor="video_file">Video File</Label>
                            <Input id="video_file" type="file" accept="video/*" onChange={(e) => setData('video_file', e.target.files?.[0] ?? null)} />
                            {lesson.video_path && <p className="mt-1 text-xs text-muted-foreground">Current: {lesson.video_path}</p>}
                        </div>
                    )}
                    <div>
                        <Label htmlFor="thumbnail">Thumbnail</Label>
                        <Input id="thumbnail" type="file" accept="image/*" onChange={(e) => setData('thumbnail', e.target.files?.[0] ?? null)} />
                        {lesson.thumbnail_path && <img src={`/storage/${lesson.thumbnail_path}`} alt="Thumbnail" className="mt-2 h-24 rounded object-cover" />}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="author_name">Author Name</Label>
                            <Input id="author_name" value={data.author_name} onChange={(e) => setData('author_name', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="author_photo">Author Photo</Label>
                            <Input id="author_photo" type="file" accept="image/*" onChange={(e) => setData('author_photo', e.target.files?.[0] ?? null)} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="author_bio">Author Bio</Label>
                        <Textarea id="author_bio" value={data.author_bio} onChange={(e) => setData('author_bio', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="activity_content">Activity Content</Label>
                        <Textarea id="activity_content" value={data.activity_content} onChange={(e) => setData('activity_content', e.target.value)} rows={6} />
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                            <Label>Translations</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addTranslation}>
                                <PlusIcon className="size-4" /> Add Translation
                            </Button>
                        </div>
                        {data.translations.map((t, i) => (
                            <div key={i} className="mt-4 rounded border p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <Input value={t.locale} onChange={(e) => updateTranslation(i, 'locale', e.target.value)} placeholder="Locale (e.g. es, fr)" className="w-32" />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeTranslation(i)}>
                                        <TrashIcon className="size-4" />
                                    </Button>
                                </div>
                                <Input value={t.title} onChange={(e) => updateTranslation(i, 'title', e.target.value)} placeholder="Translated title" />
                                <Textarea value={t.description} onChange={(e) => updateTranslation(i, 'description', e.target.value)} placeholder="Translated description" />
                                <Textarea value={t.activity_content} onChange={(e) => updateTranslation(i, 'activity_content', e.target.value)} placeholder="Translated activity content" />
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="sort_order">Sort Order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)} />
                        </div>
                        <div className="flex items-end gap-2">
                            <input type="checkbox" id="is_published" checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} />
                            <Label htmlFor="is_published">Published</Label>
                        </div>
                    </div>
                    <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Update Lesson'}</Button>
                </form>
            </div>
        </AppLayout>
    );
}
