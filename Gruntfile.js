module.exports = function (grunt) {
  grunt.initConfig({
    eslint: {
      target: ['static/js/src/**/*']
    },

    browserify: {
      app: {
        src: 'static/js/src/app.jsx',
        dest: 'static/js/www/client.js'
        options: {
          transform: [['babelify', {presets: ['es2015', 'stage-1', 'react'] }]],
          debug: false
        }
      }
    },

    clean: {
      all: ['static/js/www', 'static/js/release']
    },

    sass: {
      main: {
        files: {
          'static/sass/styles.css': 'static/sass/main.scss'
        }
      }
    },

    copy: {
      js: {
        files: [
          {
            cwd: 'static/js/src',
            src: ['d3.legend.js'],
            dest: 'static/js/www',
            expand: true
          }
        ]
      }
    },

    watch: {
      scripts: {
        files: ['static/js/src**/*', 'static/sass/main.scss'],
        tasks: ['build'],
        options: {
          livereload: true,
          spawn: false
        }
      }
    },

    uglify: {
      default: {
        files: {
          'static/js/www/client.js': ['static/js/www/client.min.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['eslint', 'clean:all', 'browserify:app', 'sass', 'uglify']);
  grunt.registerTask('dev', ['build', 'watch']);
}
