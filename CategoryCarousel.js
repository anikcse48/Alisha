import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

// Categories array with navigation links
const categories = [
  {
    id: 'c1',
    title: 'Women',
    link: 'WomenCategories',
    webImage: require('./assets/web/women.jpg'),
    mobileImage: require('./assets/mobile/women.jpg'),
    filter: { category: 'Women' },
  },
  {
    id: 'c2',
    title: 'Men',
    link: 'MenCategories',
    webImage: require('./assets/web/men.jpg'),
    mobileImage: require('./assets/mobile/men.jpg'),
    filter: { category: 'Men' },
  },
  {
    id: 'c3',
    title: 'Kids',
    link: 'KidsCategories',
    webImage: require('./assets/web/kid.jpg'),
    mobileImage: require('./assets/mobile/kid.jpg'),
    filter: { category: 'Kids' },
  },
  {
    id: 'c4',
    title: 'Accessories',
    link: 'AccessoriesCategories',
    webImage: require('./assets/web/accessories.jpg'),
    mobileImage: require('./assets/mobile/accessories.jpg'),
    filter: { category: 'Accessories' },
  },
];

export default function CategorySlider({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;
  const isDesktop = width >= 1200;

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardHeight = isMobile ? 180 : 200;

  // Auto-scroll for mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % 3; // first 3 categories
      setActiveIndex(nextIndex);
      scrollRef.current?.scrollTo({ y: nextIndex * (cardHeight + 12), animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, isMobile]);

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / (cardHeight + 12));
    setActiveIndex(index);
  };

  // Layout widths
  const firstRowWidth = isMobile
    ? '100%'
    : isTablet
    ? 250
    : (width - 48) / 3;
  const firstRowHeight = isDesktop ? 400 : cardHeight;
  const fourthRowHeight = isMobile
    ? height * 0.5
    : isTablet
    ? 300
    : 400;

  return (
    <View style={{ padding: 0, margin: 0 }}>
      {/* First 3 categories */}
      {isMobile ? (
        <View>
          <ScrollView
            ref={scrollRef}
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            snapToInterval={cardHeight + 12}
            decelerationRate="fast"
            pagingEnabled
          >
            {categories.slice(0, 3).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: '100%',
                  height: cardHeight,
                  marginBottom: 12,
                  borderRadius: 0,
                  overflow: 'hidden',
                }}
                onPress={() => navigation.navigate(item.link, { filter: item.filter })}
              >
                <Image
                  source={item.mobileImage}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
                <View style={styles.overlay}>
                  <Text style={[styles.title, { fontSize: 18 }]}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {categories.slice(0, 3).map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeIndex === index ? styles.activeDot : null]}
              />
            ))}
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {categories.slice(0, 3).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                width: firstRowWidth,
                height: firstRowHeight,
                borderRadius: 0,
                overflow: 'hidden',
              }}
              onPress={() => navigation.navigate(item.link, { filter: item.filter })}
            >
              <Image
                source={isTablet || isDesktop ? item.webImage : item.mobileImage}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text
                  style={[
                    styles.title,
                    { fontSize: isTablet ? 24 : 32 },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Full-width fourth category */}
      <TouchableOpacity
        style={{
          width: '100%',
          height: fourthRowHeight,
          borderRadius: 0,
          overflow: 'hidden',
          marginTop: 24,
        }}
        onPress={() => navigation.navigate(categories[3].link, { filter: categories[3].filter })}
      >
        <Image
          source={isMobile ? categories[3].mobileImage : categories[3].webImage}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text
            style={[
              styles.title,
              { fontSize: isMobile ? 20 : isTablet ? 28 : 36 },
            ]}
          >
            {categories[3].title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#111',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
