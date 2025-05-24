module.exports = {
  apps: [{
    name: "invitation-next",
    script: ".next/standalone/server.js",
    args: "start",
    instances: 2,
    exec_mode: "cluster",
    env: {
      HOSTNAME: "localhost"
    }
  }]
}
