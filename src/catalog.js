export function filterCatalogue(products, { category = 'All', search = '', sort = 'featured', budget = 'all' } = {}) {
  const query = search.trim().toLocaleLowerCase();
  const list = products.filter(p => (category === 'All' || p.category === category)
    && (!query || `${p.name} ${p.category} ${p.id}`.toLocaleLowerCase().includes(query))
    && (budget === 'all' || Number(p.price) <= Number(budget)));
  if (sort === 'price-asc') return list.sort((a,b) => Number(a.price)-Number(b.price));
  if (sort === 'price-desc') return list.sort((a,b) => Number(b.price)-Number(a.price));
  if (sort === 'name') return list.sort((a,b) => a.name.localeCompare(b.name));
  return [...list.filter(p=>p.category !== 'Bracelets'), ...list.filter(p=>p.category === 'Bracelets')];
}
