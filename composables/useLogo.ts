const logoConfig: Record<string, { width: string }> = {
  'quendex': {
    width: 'w-20',
  },
}

export const useLogo = () => {
  const runtimeConfig = useRuntimeConfig()

  let SITE_NAME = runtimeConfig.public.siteName;
  SITE_NAME = SITE_NAME.toLowerCase().replace(/\s+/g, '-')

  const config = logoConfig[SITE_NAME]

  return {
    // logoSrc: () => config.src,
    logoSrc: () => `/img/sites/${SITE_NAME}/logo.png`,
    faviconSrc: () => `/img/sites/${SITE_NAME}/favicon.ico`,
    logoWidth: () => config.width,
  }
}