const { createProxyMiddleware } = require("http-proxy-middleware");

let https = require("https");

module.exports = (app) => {
  app.use(
    "/photos",
    createProxyMiddleware({
      target: "https://k9lvn-photo-gallery-app.herokuapp.com",
      changeOrigin: true,
      // agent: https.globalAgent,
      // secure: false,
    })
  );
};
