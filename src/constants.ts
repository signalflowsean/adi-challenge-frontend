export const NUM_PRODUCERS = 10
export const SOCKET_URL_PREFIX = 'ws://127.0.0.1:8000/producer/'
export const BATCH_SIZE = 100
export const BATCH_INTERVAL = 10 // ms
export const REDUCED_BATCH_SIZE = 10

export const MAX_PLOTTED_SECONDS = 6
export const MAX_PRODUCER_VALUES = MAX_PLOTTED_SECONDS * REDUCED_BATCH_SIZE * BATCH_INTERVAL

export type Margin = {
  top: number
  right: number
  bottom: number
  left: number
}

export const HEIGHT = 500
export const MARGIN: Margin = { top: 32, right: 32, bottom: 32, left: 32 } 