const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    // runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    // buildExcludes: ['/redirect.html', '/redirect'],
  },
  future: {
    webpack5: true,
  },
});
