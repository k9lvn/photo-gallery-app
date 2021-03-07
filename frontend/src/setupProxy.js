const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    "/photos",
    createProxyMiddleware({
      target: "http://localhost:3300",
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "/api/v1"
      // }
    })
  );
};
