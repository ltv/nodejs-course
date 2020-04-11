module.exports = {
  nodeID: 'ltv-nodejs-course',
  logLevel: 'info',

  serializer: 'JSON',

  // cacher: {
  //   type: 'memory',
  //   options: {
  //     ttl: 10, // 30 seconds
  //   },
  // },
  cacher: 'redis://localhost:6379',

  //requestTimeout: 10 * 1000,
  retryPolicy: {
    enabled: false,
    retries: 5,
    delay: 100,
    maxDelay: 1000,
    factor: 2,
    check: (err) => err && !!err.retryable,
  },

  maxCallLevel: 100,
  heartbeatInterval: 5,
  heartbeatTimeout: 15,

  tracking: {
    enabled: false,
    shutdownTimeout: 5000,
  },

  disableBalancer: false,

  registry: {
    strategy: 'RoundRobin',
    preferLocal: true,
  },

  circuitBreaker: {
    enabled: false,
    threshold: 0.5,
    windowTime: 60,
    minRequestCount: 20,
    halfOpenTime: 10 * 1000,
    check: (err) => err && err.code >= 500,
  },

  bulkhead: {
    enabled: false,
    concurrency: 10,
    maxQueueSize: 100,
  },

  validation: true,

  tracing: {
    enabled: true,
    events: true,
    exporter: [
      {
        type: 'Console',
        options: {
          width: 100,
          colors: true,
          logger: console.log,
        },
      },
    ],
  },

  hotReload: true, // update code, auto reload server `nodemon`
};
