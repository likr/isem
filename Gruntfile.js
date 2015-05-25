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
        'styles':       'app/src/styles',
        'tsMain':       'app/src',
        'jsMain':       'app/src',
        'testRoot':     'test',
        'testEs5':      'test-es5',
        'testEspowerd': 'test-espowered',
        'deploy':       'deploy'
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
            src: ['**/*-spec.js', 'mocks/**/*.js', 'utils.js'],
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
          '<%= opt.client.styles %>/**/*.css',
          '<%= opt.client.jsMain %>/**/*.js',
          '<%= opt.client.jsMain %>/**/*.js.map'
        ]
      },
      testEs5: {
        src: [
          '<%= opt.client.testEs5 %>'
        ]
      },
      testEspowerd: {
        src: [
          '<%= opt.client.testEspowerd %>'
        ]
      },
      deploy: {
        src: '<%= opt.client.deploy %>/*'
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

    less: {
      development: {
        options: {
          paths: ['<%= opt.client.styles %>']
        },
        files: {
          'app/src/styles/bundle.css': '<%= opt.client.styles %>/app.less'
        }
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
      }
    },

    copy: {
      deploy: {
        files: [
          {
            expand: true,
            cwd: 'app',
            src: [
              'src/scripts/bundle.js',
              'src/resources/**',
              '**/*.html',
              '**/*.css'
            ],
            dest: '<%= opt.client.deploy %>'
          }
        ]
      }
    }
  });

  grunt.registerTask('basic', [
    'clean:client',
    'less',
    'ts'
  ]);

  grunt.registerTask('test', [
    'babel',
    'espower',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'basic',
    'browserify',
    'ngAnnotate'
  ]);

  grunt.registerTask('deploy', [
    'clean:deploy',
    'copy:deploy'
  ]);

  grunt.registerTask('default', 'build');
};
