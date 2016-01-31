module.exports = function(grunt) {
 
 

  // Configure Grunt 
  grunt.initConfig({


    concat: {
      js: {
        src: ['public/javascripts/index.js', 'public/javascripts/account.js' ],
        dest: 'public/javascripts/script.js',
      },
      css: {
        src: ['public/stylesheets/style.css', 'public/stylesheets/account.css'],
        dest: 'public/stylesheets/main.css',
      },
      bowerjs: {
        src: ['public/bower/jquery/dist/jquery.min.js', 'public/bower/bootstrap/dist/js/bootstrap.min.js' ,  'public/bower/bootstrap-toggle/js/bootstrap-toggle.min.js' , 'public/bower/slick.js/slick/slick.js' , 'public/bower/toastr/toastr.js' , 'public/bower/sweetalert/dist/sweetalert.min.js' , 'public/bower/moment/min/moment-with-locales.min.js' ],
        dest: 'public/javascripts/bower.js',
      },
      bowercss: {
        src: ['public/bower/bootstrap/dist/css/bootstrap.min.css', 'public/bower/slick.js/slick/slick.css', 'public/bower/bootstrap-toggle/css/bootstrap-toggle.min.css' , 'public/bower/slick.js/slick/slick-theme.css' , 'public/bower/fontawesome/css/font-awesome.min.css' , 'public/bower/rrssb/css/rrssb.css' , 'public/bower/toastr/toastr.css' , 'public/bower/icheck/skins/flat/_all.css' , 'public/bower/sweetalert/dist/sweetalert.css'],
        dest: 'public/stylesheets/bower.css',
      },                                                                                                                                                               
    },


     watch: {
      options:{livereload: true},
      js: {
        files: ['public/javascripts/**/*.js'],
        tasks: ['concat:js'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['public/stylesheets/**/*.css'],
        tasks: ['concat:css'],
        options: {
          spawn: false,
        },
      },
    },


  });
    
  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch' , 'concat' ]);
    
};