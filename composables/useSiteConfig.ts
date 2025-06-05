export const useSiteConfig = () => {
  const runtimeConfig = useRuntimeConfig()
  const siteName = runtimeConfig.public.siteName
  const siteDomain = runtimeConfig.public.siteDomain
  return {
    siteName,
    siteDomain,
  }
}