var gulp = require('gulp');
var git = require('gulp-git');
var shell = require('gulp-shell');
var spawn = require('child_process').spawn;

var options = {
  server : {
    repository: 'https://github.com/nearshorecode/sharingideas-server.git',
    path: './servers/server'
  },
  webclient: {
    repository: 'https://github.com/nearshorecode/sharingideas-server.git',
    path: './servers/client'
  }
};

gulp.task('clone-server', function(){
  git.clone(options.server.repository, { args: options.server.path },function (err) {
    if (!err) {
      spawn('npm', ['install'], { cwd: options.server.path, stdio: 'inherit' })
    }
  })
});


gulp.task('clone-client', function(){
  git.clone(options.webclient.repository, { args: options.webclient.path},function (err) {
    if (!err) {
      spawn('npm', ['install'], { cwd: options.webclient.path, stdio: 'inherit' })
    }
  });
});


gulp.task( 'clone' , function () {
  gulp.run(['clone-server', 'clone-client']);
});

gulp.task('pull-server', function(){
  git.pull('origin', 'master', {cwd: options.server.path, args: '--rebase'}, function (err) {
    if (err) throw err;

  });
});

gulp.task('pull-client', function(){
  git.pull('origin', 'master', {cwd: options.webclient.path, args:'--rebase'}, function (err) {
    if (err) throw err;
  });
});


gulp.task('default', function() {
    gulp.run(['clone-server', 'clone-client']);
});

gulp.task('pull', function() {
    gulp.run(['pull-server', 'pull-client']);
});
