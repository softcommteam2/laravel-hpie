export interface Partner {
    id: number;
    name: string;
    slug: string;
    logo_path: string | null;
    description: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    website_url: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface LessonTranslation {
    id: number;
    lesson_id: number;
    locale: string;
    title: string;
    description: string | null;
    activity_content: string | null;
    created_at: string;
    updated_at: string;
}

export interface Lesson {
    id: number;
    slug: string;
    title: string;
    description: string | null;
    thumbnail_path: string | null;
    video_type: 'youtube' | 'vimeo' | 'upload';
    video_url: string | null;
    video_path: string | null;
    author_name: string | null;
    author_bio: string | null;
    author_photo_path: string | null;
    activity_content: string | null;
    is_published: boolean;
    sort_order: number;
    translations?: LessonTranslation[];
    created_at: string;
    updated_at: string;
}

export interface Contact {
    id: number;
    name: string;
    title: string | null;
    bio: string | null;
    photo_path: string | null;
    calendly_url: string | null;
    email: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Speaker {
    id: number;
    name: string;
    title: string | null;
    bio: string | null;
    photo_path: string | null;
    event_date: string | null;
    event_time: string | null;
    event_link: string | null;
    semester: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Feedback {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

export interface CertificateApplication {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    institution: string | null;
    program: string | null;
    statement: string | null;
    status: 'pending' | 'reviewing' | 'approved' | 'denied';
    admin_notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface LessonCompletion {
    id: number;
    email: string;
    lesson_id: number;
    completed_at: string;
    created_at: string;
    updated_at: string;
}

export interface Page {
    id: number;
    slug: string;
    title: string;
    content: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: { url: string | null; label: string; active: boolean }[];
}
