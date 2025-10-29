import { notFound } from 'next/navigation';
import { Hero } from '../../components/Hero';
import { Stats } from '../../components/Stats';
import { getPageFromSlug } from '../../utils/content';

const componentMap = {
  hero: Hero,
  stats: Stats,
};

interface ComposablePageProps {
  params: {
    slug: string[];
  };
}

export default async function ComposablePage({ params }: ComposablePageProps) {
  const { slug } = params;
  
  const pageSlug = slug.join('/');

  try {
    const page = await getPageFromSlug(`/${pageSlug}`);

    if (!page) {
      return notFound();
    }

    return (
      <div>
        {(page.sections || []).map((section: any, idx: number) => {
          const Component = componentMap[section.type as keyof typeof componentMap];
          return Component ? <Component key={idx} {...section} /> : null;
        })}
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
