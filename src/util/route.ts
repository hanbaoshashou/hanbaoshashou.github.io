import qs from 'querystring-es3'

export function useRoute() {
  const search = location.search

  const query = qs.parse(search.slice(1))

  return {
    query,
  }
}
