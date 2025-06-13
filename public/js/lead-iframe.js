(function () {
  const iframeId = "leadIframe";
  const scriptUrl = new URL(document.currentScript.src);
  const parentUrl = new URL(window.location.href);

  const params = {};
  [
    ...scriptUrl.searchParams.entries(),
    ...parentUrl.searchParams.entries(),
  ].forEach(([key, value]) => {
    params[key] = value;
  });

  const lang = (params.lang || "en").replace(/[^a-z]/gi, "");
  const iframeUrl = new URL(`${scriptUrl.origin}/${lang}/lead-iframe/`);

  Object.entries(params).forEach(([key, value]) => {
    if (key !== "lang") {
      iframeUrl.searchParams.set(key, value);
    }
  });

  const iframe = document.createElement("iframe");
  iframe.src = iframeUrl.toString();
  iframe.id = iframeId;
  iframe.style.width = "100%";
  iframe.style.border = "0";
  iframe.setAttribute("frameborder", "0");

  window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("leadIframeContainer");
    if (container) {
      container.appendChild(iframe);
    } else {
      document.body.appendChild(iframe);
    }
  });

  window.addEventListener("message", (event) => {
    if (event.data?.type === "setHeight") {
      const targetIframe = document.getElementById(iframeId);
      if (targetIframe) {
        targetIframe.style.height = `${event.data.height}px`;
      }
    }

    if (
      event.data?.type === "navigateParent" &&
      typeof event.data.url === "string"
    ) {
      window.location.href = event.data.url;
    }
  });
})();
