// ==UserScript==
// @name         Endpoint Data Capturer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Capture response bodies and send to Node.js
// @author       You
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const { fetch: originalFetch } = window;

  // We overwrite the global fetch function
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const url = typeof args[0] === "string" ? args[0] : args[0].url;

    // CHANGE THIS: Put the name of the endpoint you want to read here
    if (url && url.includes("/attempt")) {
      const clone = response.clone(); // Clone so we don't break the original site

      clone
        .json()
        .then((body) => {
          // This sends the data to your Node.js server
          originalFetch("http://localhost:3000/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: url,
              data: body,
            }),
          }).catch((err) => console.error("Node Server not found:", err));
        })
        .catch((e) => console.log("Response was not JSON."));
    }

    return response;
  };

  // Make the hijack harder to detect
  window.fetch.toString = () => "function fetch() { [native code] }";
  console.log("Watching for endpoints...");
})();
