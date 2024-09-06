export interface IUserConfig {
  show?: boolean
  type?: 'line' | 'circle' | 'both'
  position?: 'above' | 'below'
  lineStyle?: ILineStyle
  circleStyle?: ICircleStyle
  zIndex?: number
  gridStepX?: number
  gridStepY?: number
  gridDensityStrategy?: 'hide' | 'expand'
}
interface ILineStyle {
  color?: string
  lineWidth?: number
  lineDash?: number[]
}

interface ICircleStyle {
  color?: string
  radius: number
}
