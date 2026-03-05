import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Speaker } from '@/types';
import { useForm } from '@inertiajs/react';

interface Props { speaker: Speaker; }

export default function SpeakersEdit({ speaker }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', name: speaker.name, title: speaker.title ?? '', bio: speaker.bio ?? '',
        event_date: speaker.event_date ?? '', event_time: speaker.event_time ?? '',
        event_link: speaker.event_link ?? '', semester: speaker.semester ?? '',
        is_active: speaker.is_active, photo: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/admin/speakers/${speaker.id}`, { forceFormData: true });
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Speakers', href: '/admin/speakers' }, { title: 'Edit', href: `/admin/speakers/${speaker.id}/edit` }]}>
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="text-2xl font-bold">Edit Speaker</h1>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div><Label htmlFor="name">Name *</Label><Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />{errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}</div>
                    <div><Label htmlFor="title">Title</Label><Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} /></div>
                    <div><Label htmlFor="bio">Bio</Label><Textarea id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} /></div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div><Label htmlFor="event_date">Event Date</Label><Input id="event_date" type="date" value={data.event_date} onChange={(e) => setData('event_date', e.target.value)} /></div>
                        <div><Label htmlFor="event_time">Event Time</Label><Input id="event_time" type="time" value={data.event_time} onChange={(e) => setData('event_time', e.target.value)} /></div>
                    </div>
                    <div><Label htmlFor="event_link">Event Link</Label><Input id="event_link" value={data.event_link} onChange={(e) => setData('event_link', e.target.value)} /></div>
                    <div><Label htmlFor="semester">Semester</Label><Input id="semester" value={data.semester} onChange={(e) => setData('semester', e.target.value)} /></div>
                    <div>
                        <Label htmlFor="photo">Photo</Label>
                        <Input id="photo" type="file" accept="image/*" onChange={(e) => setData('photo', e.target.files?.[0] ?? null)} />
                        {speaker.photo_path && <img src={`/storage/${speaker.photo_path}`} alt="Photo" className="mt-2 size-16 rounded-full object-cover" />}
                    </div>
                    <div className="flex items-end gap-2">
                        <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                        <Label htmlFor="is_active">Active</Label>
                    </div>
                    <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Update Speaker'}</Button>
                </form>
            </div>
        </AppLayout>
    );
}
