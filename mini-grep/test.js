const {exec} = require('child_process');
const assert = require('assert');

const test_cases = [
    {input: 'grep.js slice', stdout: 'let args = process.argv.slice(2);\n'},
    {input: 'grep.js bin', stdout: '#!/usr/bin/env node\n'}
];

const run = (test_case) => {
    return new Promise((resolve, reject) => {
        exec('node grep.js ' + test_case.input, (error, stdout) => {
            try {
                if (error) throw error;
                assert.equal(stdout, test_case.stdout);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    });
};

let test_runs = test_cases.map(run);
Promise.all(test_runs).then(() => console.log('all tests done')).catch((e) => console.log('test failed', e));