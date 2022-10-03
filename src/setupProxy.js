const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "https://api.thedogapi.com/v1/breeds",
    createProxyMiddleware({
      target: "https://api.thedogapi.com/v1/breeds",
      changeOrigin: true,
    })
  );
};
