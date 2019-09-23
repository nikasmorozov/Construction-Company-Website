module.exports = function (grunt) {
  grunt.initConfig({
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'src/assets/style',
          cssDir: 'public/assets/style',
          environment: 'production'
        }
      },
    },
    assemble: {
      options: {
        layoutdir: 'src/templates/layouts',
        layout: ['default.hbs'],
        partials: ['src/templates/partials/{,*/}*.*', 'src/sprites/svg/*'],
        helpers: ['partial'],
        flatten: true
      },
      en: {
        options: {
          data: 'src/templates/data/en/*.yml'
        },
        src: ['src/templates/pages/*.hbs'],
        dest: './public'
      }
    },
    watch: {
      css: {
        files: ['src/assets/style/*.scss', 'src/templates/**/*.hbs'],
        tasks: ['compass', 'assemble:en'],
        options: {
          livereload: true,
        },
      },
    },
    svg_sprite: {
      generate: {
        cwd: 'web/assets/vendor/material-design-icons',
        src: [
          // 'content/svg/production/ic_add_24px.svg',
          '../../../../public/assets/img/ic_construct_24px.svg',
          '../../../../public/assets/img/ic_behance_24px.svg',
          '../../../../public/assets/img/ic_visa_24px.svg',
          '../../../../public/assets/img/ic_mastercard_24px.svg',
          '../../../../public/assets/img/ic_vimeo_24px.svg',
          '../../../../public/assets/img/ic_paypal_24px.svg',
          '../../../../public/assets/img/ic_soundcloud_24px.svg',
        ],
        dest: 'src/sprites',
        options: {
          shape: {
            id: {
              generator: function (filename) {
                var id = filename.match(/ic_(\w+)_\d+/);
                return id[1];
              }
            },
          },
          mode: {
            symbol: {
              dest: ''
            }
          }
        }
      }
    }

  });

  [
    'grunt-contrib-compass',
    'grunt-contrib-watch',
    'grunt-svg-sprite',
    'grunt-assemble'
  ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', [
    'compass',
    'assemble:en'
  ]);
};
