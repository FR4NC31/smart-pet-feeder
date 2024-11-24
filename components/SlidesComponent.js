import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Image, FlatList, Dimensions, Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function Slides() {


  const [fontsLoaded] = useFonts({
    MontserratBold: require('../assets/Fonts/Montserrat-Bold.ttf'),
  });

  const flatlistRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { id: '1', image: require('../assets/dogslide.png'), text: 'With care and love\nfor your pets' },
    { id: '2', image: require('../assets/rabbitslide.png'), text: 'Take care of your pets' },
    { id: '3', image: require('../assets/parrotslide.png'), text: 'Your pet would love it' },
  ];

  const renderSlides = ({ item }) => (
    <View>
      <Image source={item.image} style={{ height: 400, width: screenWidth, marginTop: 60 }} />
      <Text style={styles.slideText}>{item.text}</Text>
    </View>
  );

  const renderDotIndicator = () => (
    slides.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          activeIndex === index && styles.activeDot,
        ]}
      />
    ))
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatlistRef.current) {
        const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
        flatlistRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setActiveIndex(nextIndex);
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [activeIndex]);

  return (
    <View>
      <FlatList
        data={slides}
        renderItem={renderSlides}
        ref={flatlistRef}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.dotContainer}>{renderDotIndicator()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 150,
  },
  dot: {
    backgroundColor: 'gray',
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 30,
  },
  activeDot: {
    backgroundColor: 'black',
    width: 15,
    fontFamily: 'MontserratBold',
  },
  slideText: {
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
    marginTop: 30,
    paddingTop: -30,
    fontFamily: 'MontserratBold',
    },
});
