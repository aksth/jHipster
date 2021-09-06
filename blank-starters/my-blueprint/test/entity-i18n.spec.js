const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Subgenerator entity-i18n of helloworld JHipster blueprint', () => {
    describe('Sample test', () => {
        before(async function () {
            this.timeout(20000);
            return helpers
                .create('jhipster:entity')
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
                        require('generator-jhipster/generators/entity'), // eslint-disable-line global-require
                        'jhipster:entity',
                        require.resolve('generator-jhipster/generators/entity'),
                    ],
                    [
                        require('generator-jhipster/generators/entity-i18n'), // eslint-disable-line global-require
                        'jhipster:entity-i18n',
                        require.resolve('generator-jhipster/generators/entity-i18n'),
                    ],
                    [
                        require('../generators/entity-i18n'), // eslint-disable-line global-require
                        'jhipster-helloworld:entity-i18n',
                        path.join(__dirname, '../generators/entity-i18n/index.js'),
                    ],
                ])
                .withArguments(['foo'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    dto: 'no',
                    service: 'no',
                    pagination: 'infinite-scroll',
                })
                .run();
        });

        it('it works', () => {
            // Adds your tests here
            assert.textEqual('Write your own tests!', 'Write your own tests!');
        });
    });
});
