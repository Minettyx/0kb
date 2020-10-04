const NodeCache = require( "node-cache" );
const got = require('got');

const cache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

var CacheURL = (function() {
  let methods = {};

  methods.get = async function(url, ttl = 60) {
    var name = new Buffer(url).toString('base64');

    var mdpage = cache.get(''+name);
    if(mdpage == undefined) {
      const page = await got(url);
      cache.set(''+name, page.body, ttl);
      mdpage = page.body;
    }

    return mdpage;
  }

  return methods;
})();

module.exports = CacheURL;
