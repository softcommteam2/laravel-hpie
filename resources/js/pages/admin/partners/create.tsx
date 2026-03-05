import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

export default function PartnersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        contact_email: '',
        contact_phone: '',
        website_url: '',
        is_active: true,
        sort_order: 0,
        logo: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/partners', { forceFormData: true });
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Partners', href: '/admin/partners' }, { title: 'Create', href: '/admin/partners/create' }]}>
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="text-2xl font-bold">Add Partner</h1>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="contact_email">Contact Email</Label>
                            <Input id="contact_email" type="email" value={data.contact_email} onChange={(e) => setData('contact_email', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="contact_phone">Contact Phone</Label>
                            <Input id="contact_phone" value={data.contact_phone} onChange={(e) => setData('contact_phone', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="website_url">Website URL</Label>
                        <Input id="website_url" value={data.website_url} onChange={(e) => setData('website_url', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="logo">Logo</Label>
                        <Input id="logo" type="file" accept="image/*" onChange={(e) => setData('logo', e.target.files?.[0] ?? null)} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="sort_order">Sort Order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)} />
                        </div>
                        <div className="flex items-end gap-2">
                            <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                            <Label htmlFor="is_active">Active</Label>
                        </div>
                    </div>
                    <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Create Partner'}</Button>
                </form>
            </div>
        </AppLayout>
    );
}
