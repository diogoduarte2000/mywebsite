interface PinnedRepository {
  name: string
  description?: string | null
  language?: string | null
  languageColor?: string | null
  stars?: number | string | null
  html_url?: string
  author?: string
}

function isPinnedRepository(value: unknown): value is PinnedRepository {
  return typeof value === 'object'
    && value !== null
    && 'name' in value
    && typeof value.name === 'string'
}

export default defineEventHandler(async (): Promise<PinnedRepository[]> => {
  const repositories: unknown = await $fetch<unknown>(
    'https://pinned.berrysauce.dev/get/diogoduarte2000',
    { timeout: 8000 }
  )

  if (!Array.isArray(repositories)) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Unexpected response from the pinned repositories service'
    })
  }

  const validRepositories: PinnedRepository[] = repositories
    .filter(isPinnedRepository)
    .slice(0, 6)
  if (validRepositories.length === 0) {
    throw createError({
      statusCode: 502,
      statusMessage: 'The pinned repositories service returned no valid repositories'
    })
  }

  return validRepositories
})
