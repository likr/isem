'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    opt: {
      client: {
        'app': 'app',
        'tsMain': 'app/src/scripts',
        'tsTest': 'test/unit',
        'e2eTest': 'test/e2e',
        'jsMain': 'app/src/scripts',
        'jsTest': 'test/unit',
        'jsTestEspowerd': 'test-espowered/unit'
      }
    },

    clean: {
      client: {
        src: [
          './*.js.map',
          '<%= opt.client.jsMain %>/**/*.js',
          '<%= opt.client.jsMain %>/**/*.js.map',
          '<%= opt.client.e2eTest %>/es5',
          '<%= opt.client.jsTestEspowerd %>'
        ]
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
      clientMain: {
        files: {
          'app/src/scripts/index.js': ['<%= opt.client.tsMain %>/index.ts']
        },
        options: {
          fast: 'never'
        }
      }//,
      //clientTest: {
      //  src: ['<%= opt.client.tsTest %>/index-spec.ts'],
      //  options: {
      //    module: 'commonjs'
      //  }
      //}
    },

    wiredep: {
      app: {
        src: ['<%= opt.client.app %>/index.html'],
        exclude: []
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

    mocha_istanbul: {
      main: {
        src: '<%= opt.client.allTestEspowerd %>/**/*.js',
        options: {
          mask: '**/*.js',
          reportFormats: ['lcov']
        }
      }
    }
  });

  grunt.registerTask('basic', [
    'clean',
    'ts:clientMain'
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