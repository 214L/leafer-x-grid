import { IUserConfig } from './interface'
export const defaultConfig: IUserConfig = {
  type: 'line',
  lineStyle: {
    color: 'rgb(128, 128, 128)',
    lineWidth: 1,
    lineDash: []
  },
  circleStyle: {
    color: 'rgb(128, 128, 128)',
    radius: 2
  },
  position: 'above',
  zIndex: 1000,
  show: true,
  gridStepX: 50,
  gridStepY: 50
}
