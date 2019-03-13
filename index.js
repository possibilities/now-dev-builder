const {
  runNpmInstall,
  installDependencies,
  runPackageJsonScript
} = require('@now/build-utils/fs/run-user-scripts')
const download = require('@now/build-utils/fs/download')
const { join } = require('path')

let devBuilder
const loadDevBuilder = async context => {
  // return if cached
  if (devBuilder) return devBuilder
  // otherwise initialize it
  const { files, workPath } = context
  await download(files, workPath)
  const relativeBuilderPath = context.config.builderPath || 'builder'
  const builderPath = join(workPath, relativeBuilderPath)
  await runNpmInstall(builderPath, ['--prefer-offline'])
  await runPackageJsonScript(builderPath, 'build')
  await installDependencies(workPath, ['add', '@now/build-utils'])
  // cache it
  devBuilder = require(builderPath)
  // return it
  return devBuilder
}

const createDevBuilderHook = name => async context => {
  const builder = await loadDevBuilder(context)
  return builder[name] && builder[name](context)
}

exports.build = createDevBuilderHook('build')
exports.analyze = createDevBuilderHook('analyze')
exports.prepareCache = createDevBuilderHook('prepareCache')
