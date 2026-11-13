import ResourceList from '../components/ResourceList';
import ScreenLayout from '../components/ScreenLayout';
import useSwapiList from '../hooks/useSwapiList';

export default function SpaceshipsScreen() {
  const { items, loading, error, reload } = useSwapiList('starships');
  const spaceships = items.map((ship) => ({
    url: ship.url,
    title: ship.name,
    detail: ship.model,
    meta: ship.starship_class,
  }));

  return (
    <ScreenLayout title="Spaceships">
      <ResourceList
        items={spaceships}
        loading={loading}
        error={error}
        onRetry={reload}
        emptyLabel="No spaceships found."
      />
    </ScreenLayout>
  );
}
