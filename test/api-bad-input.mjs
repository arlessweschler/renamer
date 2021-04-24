import Renamer from '../index.mjs'
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

tom.test('arrayifies files', async function () {
  const fixturePath = createFixture(`${testRoot}/${this.index}/one`)
  const renamer = new Renamer()
  const options = {
    files: fixturePath,
    find: 'o',
    replace: 'a'
  }
  await renamer.rename(options)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/ane`), true)
})

tom.test('empty plugin list defaults to [ default, index ]', async function () {
  const fixturePath = createFixture(`${testRoot}/${this.index}/one`)
  const renamer = new Renamer()
  const options = {
    files: [fixturePath],
    plugin: [],
    find: 'o',
    replace: 'a'
  }
  await renamer.rename(options)
  a.equal(fs.existsSync(`${testRoot}/${this.index}/ane`), true)
})

tom.todo('no find or replace input')

tom.skip('broken path-element', async function () {
  const renamer = new Renamer()
  const options = {
    files: ['one'],
    pathElement: 'broken'
  }
  await a.rejects(
    () => renamer.rename(options),
    /Invalid path element/i
  )
})

export default tom
