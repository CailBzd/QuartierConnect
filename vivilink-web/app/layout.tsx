import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import store from './store';  // Assurez-vous que le chemin est correct

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'ViviLink',
    description: 'Manage your neighborhood with ease',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider store={store}>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
