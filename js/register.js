document.addEventListener("DOMContentLoaded", event => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register("js/index.js")
        .then(registration => console.log("registered", registration))
        .catch(e => console.log("failed", e));
    }
  });

