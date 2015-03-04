'use strict';

var licensify = require('licensify');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    opt: {
      client: {
        'app':          'app',
        'tsMain':       'app/src',
        'jsMain':       'app/src',
        'testRoot':     'test',
        'testEs5':      'test-es5',
        'testEspowerd': 'test-espowered'
      },
      legacy: {
        'app':    'app/legacy',
        'tsMain': 'app/legacy/src/scripts',
        'jsMain': 'app/legacy/src/scripts'
      }
    },

    babel: {
      options: {
        sourceMap: true
      },
      test: {
        files: [
          {
            expand: true,
            cwd: '<%= opt.client.testRoot %>/',
            src: ['**/*-spec.js', 'mocks/**/*.js'],
            dest: '<%= opt.client.testEs5 %>/'
          }
        ]
      }
    },

    browserify: {
      options: {
        preBundleCB: function(b) {
          b.plugin(licensify, {scanBrowser: true});
          b.transform({global: true}, 'browserify-shim');
        }
      },
      client: {
        files: {
          'app/src/scripts/bundle.js': ['app/src/**/*.js']
        }
      }
    },

    clean: {
      client: {
        src: [
          './*.js.map',
          '<%= opt.client.jsMain %>/**/*.js',
          '<%= opt.client.jsMain %>/**/*.js.map',
        ]
      },
      test: {
        src: [
          '<%= opt.client.testEs5 %>',
          '<%= opt.client.testEspowerd %>'
        ]
      },
      legacy: {
        src: [
          '<%= opt.legacy.jsMain %>/**/*.js',
          '<%= opt.legacy.jsMain %>/**/*.js.map'
        ]
      }
    },

    espower: {
      test: {
        files: [
          {
            expand: true,
            cwd: '<%= opt.client.testEs5 %>/',
            src: ['**/*.js'],
            dest: '<%= opt.client.testEspowerd %>',
            ext: '.js'
          }
        ]
      }
    },

    mochaTest: {
      client: {
        src: ['<%= opt.client.testEspowerd %>/unit/**/*.js']
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      client: {
        expand: true,
        src: ['./<%= opt.client.jsMain %>/bundle.js']
      },
      legacy: {
        expand: true,
        src: ['./<%= opt.legacy.jsMain %>/index.js']
      }
    },

    protractor: {
      options: {
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      fast: {
        options: {
          configFile: "./protractor.conf.js"
        }
      },
      needDelay: {
        options: {
          configFile: "./protractor-delay.conf.js"
        }
      }
    },

    ts: {
      options: {
        comments: true,
        compiler: './node_modules/.bin/tsc',
        module: 'commonjs',
        noImplicitAny: true,
        target: 'es5'
      },
      client: {
        src: ['<%= opt.client.tsMain %>/**/*.ts'],
        options: {
          sourceMap: false // Incompatible with browserify.
        }
      },
      legacy: {
        files: {
          'app/legacy/src/scripts/index.js': ['<%= opt.legacy.tsMain %>/index.ts']
        },
        options: {
          sourceMap: true,
          fast: 'never'
        }
      }
    },

    wiredep: {
      legacy: {
        src: ['<%= opt.legacy.app %>/index.html'],
        exclude: []
      }
    }
  });

  grunt.registerTask('basic', [
    'clean',
    'ts:client',
    'browserify',
    'ngAnnotate'
  ]);

  grunt.registerTask('test', [
    'clean',
    'ts:client',
    'babel',
    'espower',
    'mochaTest'
  ]);

  grunt.registerTask('e2e', [
    'basic',
    'babel',
    'protractor'
  ]);

  grunt.registerTask('start', [
    'basic'
  ]);
};
