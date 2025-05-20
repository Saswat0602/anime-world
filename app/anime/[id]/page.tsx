import AnimeDetailsClient from './AnimeDetailsClient';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const AnimeDetailsPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <AnimeDetailsClient id={resolvedParams.id} />;
};

export default AnimeDetailsPage;