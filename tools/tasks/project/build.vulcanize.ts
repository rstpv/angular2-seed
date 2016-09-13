import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';

import Config  from '../../config';

const plugins = <any>gulpLoadPlugins();

export = () => {
  return gulp.src(Config.VULCANIZE_SOURCES)
    .pipe(plugins.plumber())
    .pipe(plugins.vulcanize(Config.getPluginConfig('gulp-vulcanize')))
    .pipe(gulp.dest(Config.APP_DEST));
};
