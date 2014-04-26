module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		connect: {
			dev: {
				options: {
					hostname: 'localhost',
					base: ['./src', './bower_components'],
					livereload: true,
					open: true
				}
			}
		},
		watch: {
			livereload: {
				files: ['./src/**/*.{html,js,png,ogg,mp3,css,xml,json}'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.registerTask('serve', ['connect:dev', 'watch']);
}