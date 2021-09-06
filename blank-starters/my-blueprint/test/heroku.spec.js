const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('Subgenerator heroku of helloworld JHipster blueprint', () => {
    describe.skip('Sample test', () => {
        before(async function () {
            this.timeout(20000);
            return helpers
                .create('jhipster:heroku')
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
                        require('generator-jhipster/generators/heroku'), // eslint-disable-line global-require
                        'jhipster:heroku',
                        require.resolve('generator-jhipster/generators/heroku'),
                    ],
                    [
                        require('../generators/heroku'), // eslint-disable-line global-require
                        'jhipster-helloworld:heroku',
                        path.join(__dirname, '../generators/heroku/index.js'),
                    ],
                ])
                .withPrompts({
                    baseName: 'sampleMysql',
                    packageName: 'com.mycompany.myapp',
                    applicationType: 'monolith',
                    databaseType: 'sql',
                    devDatabaseType: 'h2Disk',
                    prodDatabaseType: 'mysql',
                    cacheProvider: 'ehcache',
                    authenticationType: 'session',
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr', 'de'],
                    buildTool: 'maven',
                    rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
                })
                .run();
        });

        it('it works', () => {
            // Adds your tests here
            assert.textEqual('Write your own tests!', 'Write your own tests!');
        });
    });
});
