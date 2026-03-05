import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Partner } from '@/types';
import { useForm } from '@inertiajs/react';

interface Props {
    partner: Partner;
}

export default function PartnersEdit({ partner }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: partner.name,
        description: partner.description ?? '',
        contact_email: partner.contact_email ?? '',
        contact_phone: partner.contact_phone ?? '',
        website_url: partner.website_url ?? '',
        is_active: partner.is_active,
        sort_order: partner.sort_order,
        logo: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/admin/partners/${partner.id}`, { forceFormData: true });
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Partners', href: '/admin/partners' }, { title: 'Edit', href: `/admin/partners/${partner.id}/edit` }]}>
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="text-2xl font-bold">Edit Partner</h1>
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
                        <Label htmlFor="logo">Logo {partner.logo_path && '(current logo will be kept if no new file is uploaded)'}</Label>
                        <Input id="logo" type="file" accept="image/*" onChange={(e) => setData('logo', e.target.files?.[0] ?? null)} />
                        {partner.logo_path && <img src={`/storage/${partner.logo_path}`} alt="Current logo" className="mt-2 h-16 object-contain" />}
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
                    <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Update Partner'}</Button>
                </form>
            </div>
        </AppLayout>
    );
}
