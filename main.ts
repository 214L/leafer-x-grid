import { App, Rect } from 'leafer-ui'

import { GridPlugin } from './src' // 引入插件代码
// const leafer = new Leafer({
//   view: window,
//   zoom: { min: 0.02, max: 256 }
// })


const app = new App({
  view: window,
  ground: { type: 'draw' }, // 可选
  tree: {},
  sky: { type: 'draw', usePartRender: false },
})

new GridPlugin(app, {
  lineStyle:{lineDash:[]},
  position: 'above',
  zIndex: 1000,
  show: true,
  gridStepX: 50,
  gridStepY: 50,
})
const rect2 = new Rect({
  x: 150,
  y: 150,
  width: 100,
  height: 100,
  fill: '#324449',
  draggable: true,
})

const rect = new Rect({
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  fill: '#32cd79',
  // draggable: true,
  // zIndex: -3
})


app.tree.add(rect2)
app.tree.add(rect)
