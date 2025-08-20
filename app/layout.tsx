import type {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'QR Generator',
    description: 'QR Code Generator',
    generator: 'Next.js',
    applicationName: 'QR Generator',
    referrer: 'origin-when-cross-origin',
    keywords: ['Next.js', 'QR', 'QR Code', 'QR Code Generator', 'JavaScript', 'React'],
    authors: [{name: 'Jordi Ayala', url: "https://asjordi.dev"}],
    creator: 'Jordi Ayala',
    publisher: 'Jordi Ayala',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://qr.asjordi.dev'),
    openGraph: {
        title: 'QR Generator',
        description: 'QR Code Generator',
        url: 'https://qr.asjordi.dev',
        siteName: 'QR Generator',
        images: '/og-image.png',
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/apple-touch-icon-precomposed.png',
        },
    },
    twitter: {
        card: 'summary_large_image',
        title: 'QR Generator',
        description: 'QR Code Generator',
        siteId: '1467726470533754880',
        creator: '@ASJordi',
        creatorId: '1931911256488767914',
        images: ['https://qr.asjordi.dev/og-image.png'],
    },
}

export default function RootLayout({children,}: Readonly<{children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}
