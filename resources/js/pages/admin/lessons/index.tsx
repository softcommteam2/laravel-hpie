import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { Lesson } from '@/types';
import { Link, router } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';

interface Props {
    lessons: Lesson[];
}

export default function LessonsIndex({ lessons }: Props) {
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this lesson?')) {
            router.delete(`/admin/lessons/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Lessons', href: '/admin/lessons' }]}>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Lessons</h1>
                    <Button asChild>
                        <Link href="/admin/lessons/create"><PlusIcon className="size-4" /> Add Lesson</Link>
                    </Button>
                </div>
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lessons.map((lesson) => (
                            <TableRow key={lesson.id}>
                                <TableCell className="font-medium">{lesson.title}</TableCell>
                                <TableCell>{lesson.author_name}</TableCell>
                                <TableCell>{lesson.video_type}</TableCell>
                                <TableCell>
                                    <Badge variant={lesson.is_published ? 'default' : 'secondary'}>
                                        {lesson.is_published ? 'Published' : 'Draft'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{lesson.sort_order}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button asChild variant="ghost" size="icon">
                                            <Link href={`/admin/lessons/${lesson.id}/edit`}><PencilIcon className="size-4" /></Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(lesson.id)}>
                                            <TrashIcon className="size-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {lessons.length === 0 && <p className="mt-4 text-center text-muted-foreground">No lessons yet.</p>}
            </div>
        </AppLayout>
    );
}
