module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      maincss: {
        files: [{
          src: ["main.css"],
          dest: "docs/main.min.css"
        }]
      }
    },
    concat: {
      js: {
        src: [
          "app/app.js",
          "app/icons/*.controller.js",
          "app/icons/*.service.js",
          "app/icons/*.filter.js"
        ],
        dest: "docs/app/app.js"
      }
    },
    uglify: {
      appjs: {
        files: {
          "docs/app/app.min.js": ["docs/app/app.js"]
        }
      }
    },
    copy: {
      moveindex: {
        src: "index.html",
        dest: "docs/index.html"
      },
      fajson: {
        src: "fa/fa.json",
        dest: "docs/fa/fa.json"
      },
      views: {
        src: "app/icons/icons.view.html",
        dest: "docs/app/icons"
      }
    },
    injector: {
      options: {
        ignorePath: "docs",
        addRootSlash: false
      },
      dev: {
        files: {
          "index.html": [
            "main.css",
            "node_modules/angular/angular.min.js",
            "node_modules/clipboard/dist/clipboard.min.js",
            "app/*.js",
            "app/*/*.js"
          ]
        }
      },
      build: {
        files: {
          "docs/index.html": [
            "docs/*.min.css",
            "docs/js/*.min.js",
            "docs/app/*.min.js"
          ]
        }
      }
    },
    removeHtmlComments: {
      cleanhtml: {
        src: "docs/index.html",
        dest: "docs/index.html"
      }
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "docs/index.html": "docs/index.html",
          "docs/app/icons/icons.view.html": "docs/app/icons/icons.view.html"
        }
      }
    }

  });

  // Load required modules
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-injector");
  grunt.loadNpmTasks("grunt-stripcomments");
  grunt.loadNpmTasks("grunt-remove-html-comments");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");

  // Task definitions
  grunt.registerTask("dev", ["injector:dev"]);

  grunt.registerTask("build", [
    "concat:js",
    "cssmin:maincss",
    "uglify:appjs",
    "copy:moveindex",
    "copy:fajson",
    "injector:build",
    "removeHtmlComments:cleanhtml",
    "htmlmin:build"
  ]);

  // Says Hello
  grunt.registerTask("default", "Saying Hello", function(arg) {
    grunt.log.writeln("----------------------------------------");
    grunt.log.writeln("----------- HELLO DEVELOPER! -----------");
    grunt.log.writeln("----------------------------------------");

  });
};
