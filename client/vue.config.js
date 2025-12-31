module.exports = {
  lintOnSave: false,
  publicPath: "./",
  outputDir: "dist",
  css: { extract: false },

  // Add this to disable caching
  chainWebpack: (config) => {
    config.cache(false); // Disable webpack cache

    // your existing config
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options["transformAssetUrls"] = {
          "b-embed": ["src", "poster"],
          source: "src",
          track: "src",
        };
        return options;
      });
    config.module
      .rule("media")
      .test(/\.(vtt|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/);
  },
  devServer: {
    proxy: "http://localhost:3000",
  },
};
