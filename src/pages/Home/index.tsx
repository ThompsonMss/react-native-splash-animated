import React from 'react';
import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import LottieView from 'lottie-react-native'
import RocketLottie from '../../../assets/Lottie/RocketLottie.json'
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withDelay, withTiming } from 'react-native-reanimated';

import Img1 from '../../../assets/images/1.png';
import Img2 from '../../../assets/images/2.png';
import Img3 from '../../../assets/images/3.png';
import Img4 from '../../../assets/images/4.png';
import Img5 from '../../../assets/images/5.png';

const data = [
  {
    key: '1',
    img: Img1
  },
  {
    key: '2',
    img: Img2
  },
  {
    key: '3',
    img: Img3
  },
  {
    key: '4',
    img: Img4
  },
  {
    key: '5',
    img: Img5
  }
]

export default function Home({ navigation }) {

  const { width: widthScreen, height: heightScreen } = useWindowDimensions();

  const SIZE_LOTTIE = 120;

  const marginLeftLottie = useSharedValue((widthScreen - SIZE_LOTTIE) / 2);
  const stylesLottie = useAnimatedStyle(() => {
    return {
      marginLeft: marginLeftLottie.value
    }
  });

  const marginLeftText = useSharedValue(widthScreen * 2);
  const stylesText = useAnimatedStyle(() => {
    return {
      marginLeft: marginLeftText.value
    }
  });

  React.useEffect(() => {
    setTimeout(() => {
      marginLeftText.value = withTiming(-20, { duration: 300 })
      marginLeftLottie.value = withDelay(300, withTiming(marginLeftLottie.value - 50, { duration: 300 }))
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Animated.View
          style={[{
            width: SIZE_LOTTIE,
            height: SIZE_LOTTIE
          },
            stylesLottie]}
        >
          <LottieView
            source={RocketLottie}
            autoPlay={false}
            loop={false}
          />
        </Animated.View>

        <Animated.Text
          style={[
            {
              color: '#000',
              marginTop: 45,
              fontSize: 20, fontWeight: 'bold'
            }, stylesText
          ]}
        >
          ROCKET
        </Animated.Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerStyle}
      >
        {data.map(item => (
          <Image style={styles.img} source={item.img} key={item.key} />
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2fa'
  },
  header: {
    backgroundColor: '#FFF',
    height: 100,
    flexDirection: 'row',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  scroll: {
    width: '100%'
  },
  containerStyle: {
    padding: 20,
    paddingBottom: 0
  },
  img: {
    width: '100%',
    height: 170,
    marginBottom: 20,
    borderRadius: 20
  }
});
