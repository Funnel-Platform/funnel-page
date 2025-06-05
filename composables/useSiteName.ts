export const useSiteName = () => {
  const runtimeConfig = useRuntimeConfig()
  const siteName = runtimeConfig.public.siteName
  return siteName
}