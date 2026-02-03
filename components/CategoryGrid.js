import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

// ✅ Import local images explicitly
import sareeImg from '../assets/categories/sharee.jpg';
import topsImg from '../assets/categories/tops.jpg';
import kurtiImg from '../assets/categories/kurti.jpg';
import salwarImg from '../assets/categories/salwar.jpg';
import ponchoImg from '../assets/categories/poncho.jpg';
import blouseImg from '../assets/categories/blouse.jpg';
import ornaImg from '../assets/categories/orna.jpg';
import skirtImg from '../assets/categories/skirt.jpg';
import pantImg from '../assets/categories/pant.jpg';
import tshirtImg from '../assets/categories/tshirt.jpg';
import shawlImg from '../assets/categories/shawl.jpg';
import frockImg from '../assets/categories/frock.jpg';
import twoPieceImg from '../assets/categories/two-piece.jpg';
import kaftanImg from '../assets/categories/kaftan.jpg';


// Categories array with images
const categories = [
  { id: 'c1', title: 'Saree', link: '/women/saree', image: sareeImg },
  { id: 'c2', title: 'Tops', link: '/women/tops', image: topsImg },
  { id: 'c3', title: 'Kurti', link: '/women/kurti', image: kurtiImg },
  { id: 'c4', title: 'Salwar Kameez', link: '/women/salwar-kameez', image: salwarImg },
  { id: 'c5', title: 'Poncho', link: '/women/poncho', image: ponchoImg },
  { id: 'c6', title: 'Blouse', link: '/women/blouse', image: blouseImg },
  { id: 'c7', title: 'Orna', link: '/women/orna', image: ornaImg },
  { id: 'c8', title: 'Skirt', link: '/women/skirt', image: skirtImg },
  { id: 'c9', title: 'Pant', link: '/women/pant', image: pantImg },
  { id: 'c10', title: 'T-Shirt', link: '/women/t-shirt', image: tshirtImg },
  { id: 'c11', title: 'Shawl', link: '/women/shawl', image: shawlImg },
  { id: 'c12', title: 'Frock', link: '/women/frock-1', image: frockImg },
  { id: 'c13', title: 'Two Piece', link: '/women/two-piece', image: twoPieceImg },
  { id: 'c14', title: 'Kaftan', link: '/women/kaftan', image: kaftanImg },
];

export default function CategoryGrid({ navigation }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;

  const numColumns = isMobile ? 2 : isTablet ? 3 : 4;
  const cardMargin = 8;
  const cardWidth = (width - cardMargin * (numColumns + 1)) / numColumns;
  const cardHeight = cardWidth * 1.2;

  return (
    <ScrollView contentContainerStyle={{ padding: cardMargin }}>
      <View style={styles.grid}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { width: cardWidth, height: cardHeight, margin: cardMargin / 2 }]}
            onPress={() => {
              // If using React Navigation
              if (navigation && item.link) {
                // For web links, you may need Linking.openURL()
                navigation.navigate(item.link.replace('/', '')); // Adjust route names
              }
            }}
          >
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.button}>View Products</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eee',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: 6,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  button: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    textDecorationLine: 'underline',
  },
});
