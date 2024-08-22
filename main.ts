import { Leafer, Rect } from 'leafer-ui'

import { Selector, SelectEvent } from './src' // 引入插件代码


const leafer = new Leafer({ view: window })

const rect2 = new Rect({
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: '#324449',
    draggable: true,
    zIndex: 2
})

const rect = new Rect({
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: '#32cd79',
    draggable: true,
    zIndex: 1
})

leafer.add(rect)
leafer.add(rect2)

console.log(Selector, SelectEvent)