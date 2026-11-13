const BASE_URL = 'https://swapi.dev/api';

export async function fetchAll(resource, signal) {
  const items = [];
  let url = `${BASE_URL}/${resource}/`;

  while (url) {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const page = await response.json();
    items.push(...page.results);
    url = page.next;
  }

  return items;
}
