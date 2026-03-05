import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Contact } from '@/types';
import { useForm } from '@inertiajs/react';

interface Props { contact: Contact; }

export default function ContactsEdit({ contact }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', name: contact.name, title: contact.title ?? '', bio: contact.bio ?? '',
        calendly_url: contact.calendly_url ?? '', email: contact.email ?? '',
        is_active: contact.is_active, sort_order: contact.sort_order, photo: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/admin/contacts/${contact.id}`, { forceFormData: true });
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Contacts', href: '/admin/contacts' }, { title: 'Edit', href: `/admin/contacts/${contact.id}/edit` }]}>
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="text-2xl font-bold">Edit Contact</h1>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div><Label htmlFor="title">Title</Label><Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} /></div>
                    <div><Label htmlFor="bio">Bio</Label><Textarea id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} /></div>
                    <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} /></div>
                    <div><Label htmlFor="calendly_url">Calendly URL</Label><Input id="calendly_url" value={data.calendly_url} onChange={(e) => setData('calendly_url', e.target.value)} /></div>
                    <div>
                        <Label htmlFor="photo">Photo</Label>
                        <Input id="photo" type="file" accept="image/*" onChange={(e) => setData('photo', e.target.files?.[0] ?? null)} />
                        {contact.photo_path && <img src={`/storage/${contact.photo_path}`} alt="Photo" className="mt-2 size-16 rounded-full object-cover" />}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div><Label htmlFor="sort_order">Sort Order</Label><Input id="sort_order" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)} /></div>
                        <div className="flex items-end gap-2">
                            <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                            <Label htmlFor="is_active">Active</Label>
                        </div>
                    </div>
                    <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Update Contact'}</Button>
                </form>
            </div>
        </AppLayout>
    );
}
