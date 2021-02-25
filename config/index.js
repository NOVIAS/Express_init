module.exports = {
  projectConfig: {
    host: process.env.HOST || "127.0.0.1",
    port:
      process.env.POST || (process.env.NODE_ENV === "production" ? 8080 : 4000),
  },
  dbConfig: {
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "123456",
    database: "my_db",
  },
  logConfig: {
    dev: "dev",
    combined: "combined",
  },
  // TODO: webpack
};
