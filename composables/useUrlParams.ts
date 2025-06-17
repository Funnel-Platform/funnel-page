import { useRoute, useRouter, useCookie } from "#app";

export const useUrlParams = () => {
  const route = useRoute();
  const router = useRouter();
  const cookie = useCookie("urlParams", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  // Whether to output debug messages
  const doDevOutput =
    process.env.NODE_ENV === "development" || "is_test" in route.query;

  const handleUrlParams = () => {
    const urlParams = route.query;
    const urlParamsFromCookie = cookie.value;

    if (doDevOutput) {
      console.log("urlParams logic; Running...");
    }

    // If URL params exist, store them in a cookie
    if (Object.keys(urlParams).length) {
      cookie.value = urlParams as any;
      if (doDevOutput) {
        console.log("urlParams logic; Cookie has been set");
      }
    }

    // If current URL params is empty & URL params are set within a cookie
    // redirect to the same page with the params
    if (!Object.keys(urlParams).length && urlParamsFromCookie) {
      // Remove the cookie
      cookie.value = null;
      if (doDevOutput) {
        console.log("urlParams logic; Cookie removed");
      }

      // Append URL params
      setTimeout(() => {
        router.push({ query: urlParamsFromCookie });
        if (doDevOutput) {
          console.log("urlParams logic; Redirection from cookie");
        }
      }, 100);
    }
  };

  return {
    handleUrlParams,
  };
};
