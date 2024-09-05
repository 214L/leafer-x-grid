import { App, Leafer, useCanvas } from '@leafer-ui/node'
import napi from '@napi-rs/canvas'
import { GridPlugin } from '../src/index'
import { describe, test, expect } from 'vitest'
useCanvas('napi', napi)

describe('init in App', () => {
  test('should use sky if exist', async () => {
    const app = new App({
      width: 100,
      height: 100,
      ground: { type: 'draw' }, // 可选
      tree: {},
      sky: { type: 'draw', usePartRender: false }
    })
    new GridPlugin(app, {
      position: 'above'
    })
    expect(app.children.length).toBe(3)
    expect(app.sky.find('#gridCanvas').length).toBe(1)
    expect(app.ground.find('#gridCanvas').length).toBe(0)
  })
  test("shouldn't use sky if type is not draw", async () => {
    const app = new App({
      width: 100,
      height: 100,
      ground: { type: 'draw' }, // 可选
      tree: {},
      sky: { type: 'block', usePartRender: false }
    })
    new GridPlugin(app, {
      position: 'above'
    })
    expect(app.children.length).toBe(4)
    expect(app.children[1].find('#gridCanvas').length).toBe(1)
    expect(app.sky.find('#gridCanvas').length).toBe(0)
    expect(app.ground.find('#gridCanvas').length).toBe(0)
  })
  test('should use sky or ground direct if exist', async () => {
    const app = new App({
      width: 100,
      height: 100,
      ground: { type: 'draw' }, // 可选
      tree: {},
      sky: { type: 'draw', usePartRender: false }
    })
    new GridPlugin(app, {
      position: 'above'
    })
    expect(app.children.length).toBe(3)
    expect(app.sky.find('#gridCanvas').length).toBe(1)
    expect(app.ground.find('#gridCanvas').length).toBe(0)
  })
  // test('', async () => {
  //   const leafer = new Leafer({
  //     view: window,
  //     zoom: { min: 0.02, max: 256 }
  //   })
  //   new GridPlugin(leafer, {
  //     lineStyle: { color: 'rgba(0,0,0,0.5)' },
  //     position: 'above',
  //     zIndex: 0,
  //     show: true,
  //     gridStepX: 50,
  //     gridStepY: 50
  //   })
  // })
})

describe('init in Leafer', () => {
  test('should add grid canvas to leafer', async () => {
    const leafer = new Leafer({
      width: 100,
      height: 100,
      zoom: { min: 0.02, max: 256 }
    })
    new GridPlugin(leafer, {
      position: 'above'
    })
    expect(leafer.find('#gridCanvas').length).toBe(1)
    expect(leafer.children[0].id).toBe('gridCanvas')
  })
})
// const rect2 = new Rect({
//   x: 150,
//   y: 150,
//   width: 100,
//   height: 100,
//   fill: '#324449',
//   draggable: true
// })

// const rect = new Rect({
//   x: 100,
//   y: 100,
//   width: 100,
//   height: 100,
//   fill: '#32cd79',
//   editable: true
//   // draggable: true,
//   // zIndex: -3
// })

// if (app.isLeafer) {
//   let aim = app as App
//   aim.tree.add(rect2)
//   aim.tree.add(rect)
// } else {
//   let aim = app as Leafer
//   aim.add(rect2)
//   aim.add(rect)
// }

// console.log(app)
