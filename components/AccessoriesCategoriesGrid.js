import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

// Women category images
// Women category images
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


const accessoriesCategories = [
  { id: 'w1', title: 'Saree', image: sareeImg, filter: 'Saree' },
  { id: 'w2', title: 'Tops', image: topsImg, filter: 'Tops' },
  { id: 'w3', title: 'Kurti', image: kurtiImg, filter: 'Kurti' },
  { id: 'w4', title: 'Salwar Kameez', image: salwarImg, filter: 'Salwar' },
  { id: 'w5', title: 'Poncho', image: ponchoImg, filter: 'Poncho' },
  { id: 'w6', title: 'Blouse', image: blouseImg, filter: 'Blouse' },
  { id: 'w7', title: 'Orna', image: ornaImg, filter: 'Orna' },
  { id: 'w8', title: 'Skirt', image: skirtImg, filter: 'Skirt' },
  { id: 'w9', title: 'Pant', image: pantImg, filter: 'Pant' },
  { id: 'w10', title: 'T-Shirt', image: tshirtImg, filter: 'T-Shirt' },
  { id: 'w11', title: 'Shawl', image: shawlImg, filter: 'Shawl' },
  { id: 'w12', title: 'Frock', image: frockImg, filter: 'Frock' },
  { id: 'w13', title: 'Two Piece', image: twoPieceImg, filter: 'Two Piece' },
  { id: 'w14', title: 'Kaftan', image: kaftanImg, filter: 'Kaftan' },
];



export default function AccessoriesCategoriesGrid({ navigation }) {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;

  const numColumns = isMobile ? 3 : isTablet ? 4 : 5;
  const gap = 10;
  const cardWidth = (width - gap * (numColumns + 1)) / numColumns;
  const cardHeight = cardWidth * 1.25;

  return (
    <ScrollView contentContainerStyle={{ padding: gap }}>
      <View style={styles.grid}>
        {accessoriesCategories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              { width: cardWidth, height: cardHeight },
            ]}
            onPress={() =>
              navigation.navigate('ProductList', {
                category: 'Accessories',
                subCategory: item.filter,
              })
            }
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
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
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
