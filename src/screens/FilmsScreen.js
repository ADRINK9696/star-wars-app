import ResourceList from '../components/ResourceList';
import ScreenLayout from '../components/ScreenLayout';
import useSwapiList from '../hooks/useSwapiList';

export default function FilmsScreen() {
  const { items, loading, error, reload } = useSwapiList('films');
  const films = [...items]
    .sort((a, b) => a.episode_id - b.episode_id)
    .map((film) => ({
      url: film.url,
      title: film.title,
      detail: `Episode ${film.episode_id} · ${film.director}`,
      meta: film.release_date,
    }));

  return (
    <ScreenLayout title="Films">
      <ResourceList
        items={films}
        loading={loading}
        error={error}
        onRetry={reload}
        emptyLabel="No films found."
      />
    </ScreenLayout>
  );
}
