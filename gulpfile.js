var gulp = require('gulp'),
    crip = require('cripweb');

crip.sass(
    'src/assets/sass/crip-sidebar.scss',
    'src/assets/sass/**/*.scss',
    'compile-sass',
    false,
    'build');

crip.scripts('crip-sidebar.js', false, 'copy-jquery', 'src/assets/js', 'build');

gulp.task('default', function () {
    crip.gulp.start('crip-default');
    crip.watch();
});