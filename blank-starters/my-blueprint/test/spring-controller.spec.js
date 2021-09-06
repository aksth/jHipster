const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Subgenerator spring-controller of helloworld JHipster blueprint', () => {
    describe('Sample test', () => {
        before(async function () {
            this.timeout(20000);
            return helpers
                .create('jhipster:spring-controller')
                .inTmpDir(dir => {
                    fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
                })
                .withOptions({
                    fromCli: true,
                    skipInstall: true,
                    blueprint: 'helloworld',
                    skipChecks: true,
                })
                .withGenerators([
                    [
                        require('generator-jhipster/generators/spring-controller'), // eslint-disable-line global-require
                        'jhipster:spring-controller',
                        require.resolve('generator-jhipster/generators/spring-controller'),
                    ],
                    [
                        require('../generators/spring-controller'), // eslint-disable-line global-require
                        'jhipster-helloworld:spring-controller',
                        path.join(__dirname, '../generators/spring-controller/index.js'),
                    ],
                ])
                .withArguments(['foo'])
                .withPrompts({
                    actionAdd: false,
                })
                .run();
        });

        it('it works', () => {
            // Adds your tests here
            assert.textEqual('Write your own tests!', 'Write your own tests!');
        });
    });
});
