import { App, Leafer, Rect } from '@leafer-ui/core'
import '@leafer-in/editor' // 导入图形编辑器插件
import { GridPlugin } from './src' // 引入插件代码
// const leafer = new Leafer({
//   view: window,
//   zoom: { min: 0.02, max: 256 }
// })

// const app = new App({
//   view: window,
//   ground: { type: 'draw' }, // 可选
//   tree: {},
//   sky: { type: 'draw', usePartRender: false },
//   editor:{}
// })
const app = new Leafer({
  view: window
})

new GridPlugin(app, {
  lineStyle: { color: 'rgba(0,0,0,0.5)' },
  position: 'above',
  zIndex: 0,
  show: true,
  gridStepX: 50,
  gridStepY: 50
})
const rect2 = new Rect({
  x: 150,
  y: 150,
  width: 100,
  height: 100,
  fill: '#324449',
  draggable: true
})

const rect = new Rect({
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  fill: '#32cd79',
  editable: true
  // draggable: true,
  // zIndex: -3
})

// app.tree.add(rect2)
// app.tree.add(rect)
app.add(rect2)
app.add(rect)
console.log(app);
