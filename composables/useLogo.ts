export const useLogo = () => {
  const runtimeConfig = useRuntimeConfig();

  let SITE_NAME = runtimeConfig.public.siteName;
  SITE_NAME = SITE_NAME.toLowerCase().replace(/\s+/g, "-");

  return {
    logoSrc: () => `/img/sites/${SITE_NAME}/logo.png`,
    logoWidth: () => 'max-w-52 max-h-8 md:max-w-72 md:max-h-12',
  };
};
