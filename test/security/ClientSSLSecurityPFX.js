'use strict';

var fs = require('fs'),
    join = require('path').join;

describe('ClientSSLSecurityPFX', function() {
  var ClientSSLSecurityPFX = require('../../').ClientSSLSecurityPFX;
  var pfx = __filename;

  it('is a function', function() {
    ClientSSLSecurityPFX.should.be.type('function');
  });

  describe('defaultOption param', function() {
    it('is accepted as the second param', function() {
      new ClientSSLSecurityPFX(null, {});
    });

    it('is used in addOptions', function() {
      var options = {};
      var defaultOptions = { foo: 5 };
      var instance = new ClientSSLSecurityPFX(null, defaultOptions);
      instance.addOptions(options);
      options.should.have.property("foo", 5);
    });
  });

  it('should throw if invalid pfk file is given', function () {
    var instanceCert = null;

    try {
      instanceCert = new ClientSSLSecurityPFX({});
    } catch (e) {
      //should happen!
      instanceCert = false;
    }

    if (instanceCert !== false) {
      throw new Error('accepted wrong pfk');
    }
  });

  it('should accept a Buffer as argument for the key or cert', function () {
    var pfkBuffer = fs.readFileSync(join(__dirname, '..', 'certs', 'pfk-buffer.pfx')),
      instance;

    instance = new ClientSSLSecurityPFX(pfkBuffer);
    instance.should.have.property("pfx", pfkBuffer);
  });
});
