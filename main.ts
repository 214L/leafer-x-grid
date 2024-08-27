import { Leafer, App, Rect } from 'leafer-ui'

import { GridPlugin } from './src' // 引入插件代码
import { IUserConfig } from './src/interface'
const leafer = new Leafer({
  view: window,
  zoom: { min: 0.02, max: 256 }
})


// new GridPlugin(leafer, {
//   color: 'black',
//   position: 'above',
//   zIndex: 1000,
//   show: true,
//   gridStepX: 10,
//   gridStepY: 10,
// })
const rect2 = new Rect({
  x: 150,
  y: 150,
  width: 100,
  height: 100,
  fill: '#324449',
  draggable: true,
  // zIndex: -2
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

leafer.add(rect2)
leafer.add(rect)
