# [Now.sh](https://zeit.co/docs) development builder

A shim for loading a [now.sh builder](https://zeit.co/docs/v2/deployments/builders/developer-guide) from a project directory for development purposes. It should work well for developing small builders and/or builders that hand off much of their work to [core builders](https://github.com/zeit/now-builder://github.com/zeit/now-builders) but less so for more complex builders (e.g. it doesn't initially work for developing [@now/node](https://zeit.co/docs/v2/deployments/official-builders/node-js-now-node/) but works great for [@now/static-build](https://zeit.co/docs/v2/deployments/official-builders/static-build-now-static-build/)).

## Usage

Get example repo and install dependencies

```Shell
rm -rf /tmp/now-dev-builder-fixture
git clone https://github.com/possibilities/now-dev-builder-fixture.git /tmp/now-dev-builder-fixture
cd /tmp/now-dev-builder-fixture
yarn install
```

Get the `@now/static-build` package by cloning the `now-builders`

```Shell
rm -rf /tmp/now-builders
git clone https://github.com/zeit/now-builders.git /tmp/now-builders
```

Link the two together, change the builder source code, and run the project on now.sh

```Shell
ln -sf /tmp/now-builders/packages/now-static-build /tmp/now-dev-builder-fixture/builder
echo "\nconsole.log('LOOK FOR THIS IN THE NOW.SH CONSOLE')" >> /tmp/now-builders/packages/now-static-build/index.js
now
```
