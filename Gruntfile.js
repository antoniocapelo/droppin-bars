'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'base',
    prod: 'base_dist',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: []
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      prod: {
        options: {
          base: '<%= config.prod %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      prod: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.prod %>/*',
            '!<%= config.prod %>/.git*'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },


    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        loadPath: 'bower_components'
      },
      prod: {
          files: [{
              expand: true,
              cwd: '<%= config.app %>/styles',
              src: ['*.{scss,sass}', '!bars.scss'],
              dest: '.tmp/styles',
              ext: '.css'
          }, {
              expand: true,
              cwd: '<%= config.app %>/styles',
              src: ['bars.scss'],
              dest: '.tmp/styles',
              ext: '.css'
          }]
      },
      dist: {
          files: [{
              expand: true,
              cwd: '<%= config.app %>/styles',
              src: ['bars.scss'],
              dest: '.tmp/styles',
              ext: '.css'
          }]
      },
      server: {
        files: [{
            expand: true,
            cwd: '<%= config.app %>/styles',
            src: ['*.{scss,sass}', '!bars.scss'],
            dest: '.tmp/styles',
            ext: '.css'
        }, {
            expand: true,
            cwd: '<%= config.app %>/styles',
            src: ['bars.scss'],
            dest: '.tmp/styles',
            ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      prod: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html']
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      prod: {
        files: {
          src: [
            '<%= config.prod %>/scripts/{,*/}*.js',
            '<%= config.prod %>/styles/{,*/}*.css',
            '<%= config.prod %>/images/{,*/}*.*',
            '<%= config.prod %>/styles/fonts/{,*/}*.*',
            '<%= config.prod %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.prod %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.prod %>',
          '<%= config.prod %>/images',
          '<%= config.prod %>/styles'
        ]
      },
      html: ['<%= config.prod %>/{,*/}*.html'],
      css: ['<%= config.prod %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the prod folder
    imagemin: {
      prod: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.prod %>/images'
        }]
      }
    },

    svgmin: {
      prod: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.prod %>/images'
        }]
      }
    },

    htmlmin: {
      prod: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.prod %>',
          src: '{,*/}*.html',
          dest: '<%= config.prod %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    cssmin: {
      prod: {
        files: {
          '<%= config.dist %>/bars.css': [
            '.tmp/styles/{,*/}*.css'
          ]
        }
      }
    },
    // uglify: {
    //   prod: {
    //     files: {
    //       '<%= config.prod %>/scripts/scripts.js': [
    //         '<%= config.prod %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   prod: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      prod: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.prod %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/prod/.htaccess',
          dest: '<%= config.prod %>/.htaccess'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      dist: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        src: ['bars.scss', '.tmp/styles/bars.css'],
        dest: '<%= config.dist %>'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'sass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      prod: [
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'prod') {
      return grunt.task.run(['build', 'connect:prod:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });


  grunt.registerTask('build', [
    'clean:prod',
    'useminPrepare',
    'concurrent:prod',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:prod',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'sass:dist',
    'autoprefixer',
    'cssmin',
    'copy:dist'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);
};
