import { App, Leafer, Rect } from '@leafer-ui/core'
import '@leafer-in/editor'
import { GridPlugin } from './src' // 引入插件代码
let isApp = false
let app: App | Leafer
if (isApp) {
  app = new App({
    view: window,
    fill:"black",
    ground: { type: 'draw' }, // 可选
    tree: {},
    sky: { type: 'draw', usePartRender: false },
    editor: {}
  }) as App
} else {
  app = new Leafer({
    fill:'black',
    view: window,
    zoom: { min: 0.02, max: 256 }
  }) as Leafer
}

new GridPlugin(app, {
  lineStyle: { color: 'rgba(255,255,255,0.5)' },
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

if (app.isApp) {
  let aim = app as App
  aim.tree.add(rect2)
  aim.tree.add(rect)
} else {
  let aim = app as Leafer
  aim.add(rect2)
  aim.add(rect)
}

console.log(app)
