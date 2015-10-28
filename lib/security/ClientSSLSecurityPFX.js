'use strict';

var fs = require('fs')
  , https = require('https')
  , _ = require('lodash');

/**
 * activates SSL for an already existing client
 *
 * @module ClientSSLSecurityPFX
 * @param {Buffer|String}   key
 * @param {Buffer|String}   cert
 * @param {Buffer|String}   [ca]
 * @param {Object}          [defaults]
 * @constructor
 */
function ClientSSLSecurityPFX(pfx, defaults) {
  if (pfx) {
    if (Buffer.isBuffer(pfx)) {
      this.pfx = pfx;
    } else if (typeof pfx === 'string') {
      this.pfx = fs.readFileSync(pfx);
    } else {
      throw new Error('supplied pfx file should be a buffer or a file location');
    }
  }
  this.defaults = {};
  _.merge(this.defaults, defaults);
}

ClientSSLSecurityPFX.prototype.toXML = function(headers) {
  return '';
};

ClientSSLSecurityPFX.prototype.addOptions = function(options) {
  options.pfx = this.pfx;
  _.merge(options, this.defaults);
  options.agent = new https.Agent(options);
};

module.exports = ClientSSLSecurityPFX;
