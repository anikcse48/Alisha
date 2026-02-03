import React, { useRef, useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Animated, PanResponder } from 'react-native';

export default function ImageSlider() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;

  // IMAGES
  const slides = [
    { id: 1, desktop: require('./assets/sliders/DesktopSliders/Slider1.webp'), phone: require('./assets/sliders/PhoneSliders/Slider1.webp') },
    { id: 2, desktop: require('./assets/sliders/DesktopSliders/Slider2.webp'), phone: require('./assets/sliders/PhoneSliders/Slider2.webp') },
    { id: 3, desktop: require('./assets/sliders/DesktopSliders/Slider3.webp'), phone: require('./assets/sliders/PhoneSliders/Slider3.webp') },
    { id: 4, desktop: require('./assets/sliders/DesktopSliders/Slider4.webp'), phone: require('./assets/sliders/PhoneSliders/Slider4.webp') },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // RESPONSIVE HEIGHT FIXED
  const sliderHeight = isMobile
    ? width * 0.55
    : isTablet
    ? width * 0.40
    : width * 0.50;  // Desktop → increased height for FULL image

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, direction]);

  const goToNextSlide = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true }).start(() => {
      let next = currentIndex + direction;

      if (next >= slides.length) {
        next = slides.length - 2;
        setDirection(-1);
      } else if (next < 0) {
        next = 1;
        setDirection(1);
      }

      setCurrentIndex(next);

      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    });
  };

  const goToPrevSlide = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true }).start(() => {
      let next = currentIndex - 1;

      if (next < 0) {
        next = 1;
        setDirection(1);
      } else {
        setDirection(-1);
      }

      setCurrentIndex(next);

      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    });
  };

  // SWIPE CONTROL
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -50) goToNextSlide();
        else if (gesture.dx > 50) goToPrevSlide();
      },
    })
  ).current;

  return (
    <View
      style={[styles.sliderContainer, { height: sliderHeight }]}
      {...panResponder.panHandlers}
    >
      {/* SLIDE IMAGE */}
      <Animated.Image
        key={slides[currentIndex].id}
        source={isMobile ? slides[currentIndex].phone : slides[currentIndex].desktop}
        style={[styles.sliderImage, { opacity: fadeAnim }]}
        resizeMode="contain"  // FULL IMAGE — NO CROPPING
      />

      {/* DOTS */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // full view
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#111',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
});
