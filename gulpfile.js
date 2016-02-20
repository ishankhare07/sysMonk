var gulp = require('gulp')
    concat = require('gulp-concat');

gulp.task('controllers', function() {
    return gulp.src('js/controllers/*.js')
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('/js/lib'));
});

gulp.task('directives', function() {
    return gulp.src('js/directives/*.js')
        .pipe(concat('directives.js'))
        .pipe(gulp.dest('js/lib'));
});

gulp.task('services', function() {
    return gulp.src('js/services/*.js')
        .pipe(concat('services.js'))
        .pipe(gulp.dest('js/lib'));
});

gulp.task('watch', function() {
    gulp.watch('js/controllers/*.js', ['controllers']);
    gulp.watch('js/directives/*.js', ['directives']);
    gulp.watch('js/services/*.js', ['services']);
});
