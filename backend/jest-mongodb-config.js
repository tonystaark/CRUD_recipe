module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "recipe-test",
    },
    binary: {
      version: "4.0.2",
      skipMD5: true,
    },
    autoStart: false,
  },
};
