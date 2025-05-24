module.exports = {
  apps: [{
    name: "invitation-next",
    script: "standalone/server.js",
    args: "start",
    instances: 2,
    exec_mode: "cluster",
    env: {
      HOSTNAME: "localhost"
    }
  }]
}
