import CliApp from '../lib/cli-app.mjs'
import assert from 'assert'
import { createFixture } from './lib/util.mjs'
import rimraf from 'rimraf'
import fs from 'fs'
import path from 'path'
import TestRunner from 'test-runner'
const a = assert.strict

const tom = new TestRunner.Tom()

const testRoot = `tmp/${path.basename(import.meta.url)}`
rimraf.sync(testRoot)

tom.test('invalid option: exit code set to 1, usage guide displayed, no file renamed', async function () {
  const fixturePath = createFixture(`${testRoot}/${this.index}/one`)
  const origArgv = process.argv
  const origCode = process.exitCode
  process.argv = ['node', 'test', '--find', 'one', '--replace', 'yeah', fixturePath, '--broken']
  const cliApp = new CliApp()
  const logs = []
  cliApp.log = function (...args) {
    logs.push(args)
  }
  a.deepEqual(fs.existsSync(fixturePath), true)
  await cliApp.start()
  a.equal(process.exitCode, 1)
  process.argv = origArgv
  process.exitCode = origCode
  a.deepEqual(fs.existsSync(fixturePath), true)
  a.deepEqual(fs.existsSync(`${testRoot}/${this.index}/yeah`), false)
  a.equal(logs.length, 2)
  a.equal(/Unknown option: --broken/.test(logs[0]), true)
  a.equal(/For detailed instructions/.test(logs[1]), true)
})

export default tom
