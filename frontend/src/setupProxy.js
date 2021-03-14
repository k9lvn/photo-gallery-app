const { createProxyMiddleware } = require("http-proxy-middleware");

let https = require("https");

// module.exports = (app) => {
//   app.use(
//     "/photos",
//     createProxyMiddleware({
//       target: "https://k9lvn-photo-gallery-app.herokuapp.com/photos",
//       changeOrigin: true,
//       agent: https.globalAgent,
//       secure: false,
//     })
//   );
// };

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/photos", {
      target: "http://localhost:3300/photos",
      changeOrigin: true,
    })
  );
};
