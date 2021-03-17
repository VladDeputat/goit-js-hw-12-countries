export default function fetchCountries(searchQuery) {
  const mainLink = 'https://restcountries.eu/rest/v2/name/';
  return fetch(`${mainLink}${searchQuery}`).then(res => res.json());
}
