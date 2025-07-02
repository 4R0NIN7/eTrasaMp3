import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

type TAnimatedFlagProps = { active: boolean }

const AnimatedFlag = ({ active }: TAnimatedFlagProps) => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (active) {
      scale.value = withSpring(1, { damping: 10 })
      opacity.value = withSpring(1)
    } else {
      scale.value = withSpring(0.8)
      opacity.value = withSpring(0)
    }
  }, [active, scale, opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    marginRight: 4,
  }))

  return <Animated.Text style={animatedStyle}>🚩</Animated.Text>
}

export { AnimatedFlag }
