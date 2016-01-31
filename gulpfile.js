var gulp = require('gulp'),
    crip = require('cripweb');

crip.sass(
    'src/assets/sass/crip-sidebar.scss',
    'src/assets/sass/**/*.scss',
    'compile-sass',
    false,
    'dest');

gulp.task('default', function () {
    crip.gulp.start('crip-default');
    crip.watch();
});