var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  collecting() {
    this.log('collecting')
  }

  creating() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    )

    this.fs.copyTpl(
      this.templatePath('animation.js'),
      this.destinationPath('lib/animation.js')
    )

    this.fs.copyTpl(
      this.templatePath('carousel.js'),
      this.destinationPath('lib/carousel.js')
    )
    
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('lib/createElement.js')
    )

    this.fs.copyTpl(
      this.templatePath('cubicBezier.js'),
      this.destinationPath('lib/cubicBezier.js')
    )

    this.fs.copyTpl(
      this.templatePath('gesture.js'),
      this.destinationPath('lib/gesture.js')
    )

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html')
    )

    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    )

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )

    this.npmInstall([
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      'html-webpack-plugin',
      '@babel/plugin-transform-react-jsx',
      'mocha',
      'nyc',
      '@istanbuljs/nyc-config-babel'
    ], { 'save-dev': true })

  }
}