import '../../styles/globals.css';
import { Navigation } from '../components/Navigation';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Dream Cheesers Podcast',
  description: 'A podcast about dreams, cheese, and the journey between them',
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
