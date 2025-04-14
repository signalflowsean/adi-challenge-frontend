export type animateEveryXAnimationFrameArgs = {
  animation: () => void
  xFrames: number
  count: number
}

const animateEveryXAnimationFrame = ({ animation, xFrames, count }: animateEveryXAnimationFrameArgs) => {
  requestAnimationFrame(() => {
    if (count === xFrames) {
      count = 0
      animation()
    }
    count++
    animateEveryXAnimationFrame({ animation, xFrames, count })
  })
}

export default animateEveryXAnimationFrame