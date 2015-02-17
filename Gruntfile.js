'use strict';

var licensify = require('licensify');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    opt: {
      client: {
        'app': 'app/legacy',
        'tsMain': 'app/legacy/src/scripts',
        'tsTest': 'test/unit',
        'e2eTest': 'test/e2e',
        'jsMain': 'app/legacy/src/scripts',
        'jsTest': 'test/unit',
        'jsTestEspowerd': 'test-espowered/unit'
      },
      legacy: {
        'app': 'app/legacy',
        'tsMain': 'app/legacy/src/scripts',
        'jsMain': 'app/legacy/src/scripts'
      }
    },

    '6to5': {
      options: {
        sourceMap: true
      },
      e2e: {
        files: [
          {
            expand: true,
            cwd: '<%= opt.client.e2eTest %>/',
            src: ['**/*-spec.js'],
            dest: '<%= opt.client.e2eTest %>/es5/'
          }
        ]
      }
    },

    browserify: {
      options: {
        preBundleCB: function (b) {
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
          '<%= opt.client.e2eTest %>/es5',
          '<%= opt.client.jsTestEspowerd %>'
        ]
      },
      legacy: {
        src: [
          '<%= opt.legacy.jsMain %>/**/*.js',
          '<%= opt.legacy.jsMain %>/**/*.js.map',
        ]
      }
    },

    espower: {
      test: {
        files: [
          {
            expand: true,
            cwd: '<%= opt.client.jsTest %>/',
            src: ['**/*.js'],
            dest: '<%= opt.client.jsTestEspowerd %>',
            ext: '.js'
          }
        ]
      }
    },

    mocha_istanbul: {
      main: {
        src: '<%= opt.client.allTestEspowerd %>/**/*.js',
        options: {
          mask: '**/*.js',
          reportFormats: ['lcov']
        }
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
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
        noImplicitAny: true,
        sourceMap: true,
        target: 'es5'
      },
      legacy: {
        files: {
          'app/legacy/src/scripts/index.js': ['<%= opt.legacy.tsMain %>/index.ts']
        },
        options: {
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
    'ts:legacy',
    'ngAnnotate'
  ]);

  grunt.registerTask('e2e', [
    'basic',
    '6to5',
    'protractor'
  ]);

  grunt.registerTask('start', [
    'basic',
    'wiredep'
  ]);
};