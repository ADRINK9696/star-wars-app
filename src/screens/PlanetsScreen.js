import ResourceList from '../components/ResourceList';
import ScreenLayout from '../components/ScreenLayout';
import useSwapiList from '../hooks/useSwapiList';

function formatPopulation(population) {
  const value = Number(population);
  if (!population || population === 'unknown' || Number.isNaN(value)) {
    return 'Population unknown';
  }
  return `Population ${value.toLocaleString('en-US')}`;
}

export default function PlanetsScreen() {
  const { items, loading, error, reload } = useSwapiList('planets');
  const planets = items.map((planet) => ({
    url: planet.url,
    title: planet.name,
    detail: `${planet.climate} · ${planet.terrain}`,
    meta: formatPopulation(planet.population),
  }));

  return (
    <ScreenLayout title="Planets">
      <ResourceList
        items={planets}
        loading={loading}
        error={error}
        onRetry={reload}
        emptyLabel="No planets found."
      />
    </ScreenLayout>
  );
}
