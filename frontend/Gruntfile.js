module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        path: {
            scripts: "./scripts",
            styles: "./styles",
            resources: "./resources",
            pages: "./pages",
            build: "./public"
        },

        clean: {
            options: { force: true },
            debug: ["<%= path.build %>"]
        },

        mkdir: {
            debug: {
                options: {
                    create: ["<%= path.build %>"]
                }
            }
        },

        typescript: {
            debug: {
                src: ["<%= path.scripts %>/**/*.ts"],
                dest: "<%= path.build %>/scripts.js",
                options: {
                    module: "amd", //or commonjs
                    target: "es5",
                    sourceMap: true,
                    declaration: true,
                    basePath: "<%= path.scripts %>/"
                }
            }
        },

        less: {
            debug: {
                options: {
                    paths: "<%= path.styles %>/**/*.inc.less",
                    compress: false,
                    ieCompat: false,
                    sourceMap: true,
                    sourceMapURL: "styles.css.map"
                },
                files: {
                    "<%= path.build %>/styles.css": "<%= path.styles %>/**/*.inc.less"
                }
            }
        },

        copy: {
            debug: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= path.resources %>/",
                        src: "**/*",
                        dest: "<%= path.build %>/"
                    },
                    {
                        expand: true,
                        cwd: "<%= path.pages %>/",
                        src: "**/*",
                        dest: "<%= path.build %>/"
                    }
                ]
            }
        },

        watch: {
            options: { livereload: false },
            debug: {
                files: [
                    "<%= path.scripts %>/**/*.ts",
                    "<%= path.styles %>/**/*.less",
                    "<%= path.resources %>/**/*",
                    "<%= path.pages %>/**/*"
                ],
                tasks: ["build-debug"],
                options: {
                    spawn: false
                }
            }
        },

        express: {
            debug: {
                options: {
                    script: "app.js",
                    background: true,
                    port: 3000
                }
            }
        },

        env: {
            debug: {

            }
        }
    });

    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-express-server");
    grunt.loadNpmTasks("grunt-env");
    grunt.loadNpmTasks("grunt-mkdir");

    grunt.registerTask("default", ["build-debug"]);

    grunt.registerTask("build-debug", [
        "clean:debug",
        "mkdir:debug",
        "typescript:debug",
        "less:debug",
        "copy:debug"
    ]);

    grunt.registerTask("watch-debug", [
        "build-debug",
        "env:debug",
        "express:debug",
        "watch:debug"
    ]);
};
