import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { Page } from '@/types';

interface Props { page: Page; }

export default function PagesEdit({ page }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: page.title, content: page.content ?? '', meta_description: page.meta_description ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/admin/pages/${page.id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Pages', href: '/admin/pages' }, { title: 'Edit', href: `/admin/pages/${page.id}/edit` }]}>
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="text-2xl font-bold">Edit Page: {page.slug}</h1>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                        {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title}</p>}
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" value={data.content} onChange={(e) => setData('content', e.target.value)} rows={10} />
                    </div>
                    <div>
                        <Label htmlFor="meta_description">Meta Description</Label>
                        <Input id="meta_description" value={data.meta_description} onChange={(e) => setData('meta_description', e.target.value)} />
                    </div>
                    <Button type="submit" disabled={processing}>{processing ? 'Saving...' : 'Update Page'}</Button>
                </form>
            </div>
        </AppLayout>
    );
}
