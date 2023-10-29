import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';

import LottieView from 'lottie-react-native'
import RocketLottie from '../../../assets/Lottie/RocketLottie.json'

export default function Intro({ navigation }) {

  const SIZE_LOTTIE = 400;
  const { width: widthScreen, height: heightScreen } = useWindowDimensions();

  const leftLottie = (widthScreen - SIZE_LOTTIE) / 2;

  const animationRef = React.useRef<LottieView>();

  const positionTopAnimation = useSharedValue(heightScreen * 2);

  const [animationStarted, setAnimationStarted] = React.useState(false);

  const stylesLottie = useAnimatedStyle(() => {

    if (animationStarted === false) {
      return {
        top: positionTopAnimation.value,
        left: leftLottie,
        width: SIZE_LOTTIE,
        height: SIZE_LOTTIE
      }
    }

    const maxSize = (heightScreen - SIZE_LOTTIE) / 2;

    const size = interpolate(
      positionTopAnimation.value,
      [0, maxSize],
      [120, SIZE_LOTTIE],
      Extrapolate.CLAMP
    )

    return {
      top: positionTopAnimation.value,
      left: (widthScreen - size) / 2,
      width: size,
      height: size
    }

  })

  const circleYellow = useSharedValue(0);
  const styleCircleYellow = useAnimatedStyle(() => {
    return {
      width: circleYellow.value,
      height: circleYellow.value
    }
  })

  const circleBlue = useSharedValue(0);
  const styleCircleBlue = useAnimatedStyle(() => {
    return {
      width: circleBlue.value,
      height: circleBlue.value
    }
  })

  const circleWhite = useSharedValue(0);
  const styleCircleWhite = useAnimatedStyle(() => {
    return {
      width: circleWhite.value,
      height: circleWhite.value
    }
  })

  function onAnimationFinish() {

    const doubleHeightScreen = heightScreen * 2;

    circleYellow.value = withTiming(doubleHeightScreen, {
      duration: 500
    })

    circleBlue.value = withDelay(500, withTiming(doubleHeightScreen, {
      duration: 500
    }))

    circleWhite.value = withDelay(1000, withTiming(doubleHeightScreen, {
      duration: 500
    }))

    positionTopAnimation.value = withDelay(1500,
      withSequence(
        withTiming(positionTopAnimation.value + 100),
        withDelay(100, withTiming(0, { duration: 500 }))
      ));

    setTimeout(() => {
      navigation.replace('Home')
    }, 2700)
  }

  React.useEffect(() => {

    positionTopAnimation.value = withDelay(
      100,
      withSpring(
        (heightScreen - SIZE_LOTTIE) / 2,
        {
          mass: 1,
          damping: 10,
          stiffness: 100,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2
        }
      )
    );

  }, [])

  React.useEffect(() => {

    setTimeout(() => {
      animationRef.current.play();
      setAnimationStarted(true);
    }, 2000)

  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            zIndex: 5,
            position: 'absolute',
            width: SIZE_LOTTIE,
            height: SIZE_LOTTIE
          },
          stylesLottie
        ]}
      >
        <LottieView
          source={RocketLottie}
          autoPlay={false}
          loop={false}
          ref={animationRef}
          onAnimationFinish={onAnimationFinish}
        />
      </Animated.View>

      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 2,
            borderRadius: 1000,
            backgroundColor: '#f1c40f'
          },
          styleCircleYellow
        ]}
      />

      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 3,
            borderRadius: 1000,
            backgroundColor: '#3498db'
          },
          styleCircleBlue
        ]}
      />

      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 4,
            borderRadius: 1000,
            backgroundColor: '#fff'
          },
          styleCircleWhite
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
});
