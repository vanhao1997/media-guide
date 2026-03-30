export const LAST_UPDATED = '2026-03-29'

export const PLATFORM_LOGOS = {
    facebook: '/logos/facebook.svg',
    tiktok: '/logos/tiktok.svg',
    google: '/logos/google.svg',
    youtube: '/logos/youtube.svg',
    zalo: '/logos/zalo.svg',
    linkedin: '/logos/linkedin.svg',
    admicro: '/logos/admicro.svg',
    banner: '/logos/banner.svg',
}

export const FUNNEL_STAGES = [
    {
        id: 'awareness',
        name: 'TOFU — Awareness (Nhận biết)',
        description: 'Giai đoạn đầu phễu: tiếp cận khách hàng mới, tăng nhận diện thương hiệu',
        color: '#3B82F6',
        categories: ['awareness'],
    },
    {
        id: 'consideration',
        name: 'MOFU — Consideration (Cân nhắc)',
        description: 'Giai đoạn giữa phễu: tạo sự quan tâm, tương tác, và cân nhắc',
        color: '#8B5CF6',
        categories: ['traffic', 'engagement'],
    },
    {
        id: 'conversion',
        name: 'BOFU — Conversion (Chuyển đổi)',
        description: 'Giai đoạn cuối phễu: thu thập lead, mua hàng, cài app',
        color: '#10B981',
        categories: ['leads', 'conversions', 'app'],
    },
]

export const CATEGORY_CONFIG = {
    awareness: { label: 'Awareness', color: '#3B82F6', icon: '/icons/eye.svg' },
    traffic: { label: 'Traffic', color: '#06B6D4', icon: '/icons/cursor-click.svg' },
    engagement: { label: 'Engagement', color: '#8B5CF6', icon: '/icons/megaphone.svg' },
    leads: { label: 'Leads', color: '#10B981', icon: '/icons/user-list.svg' },
    conversions: { label: 'Conversions', color: '#EF4444', icon: '/icons/shopping-cart.svg' },
    app: { label: 'App Install', color: '#F97316', icon: '/icons/device-mobile.svg' },
}

export const FUNNEL_ORDER = ['awareness', 'traffic', 'engagement', 'leads', 'conversions', 'app']
