import 'react-native-gesture-handler';
import React, { useState, useContext, createContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Footer from './Footer'; // Your existing footer
import ImageSlider from './ImageSlider';
import CategoryCarousel from './CategoryCarousel'; // Your carousel
import CategoryGrid from './components/CategoryGrid'; // Optional for filtered grid

// ---------- Cart Context ----------
const CartContext = createContext();
function useCart() { return useContext(CartContext); }

// ---------- Header ----------
function Header({ title, navigation }) {
  const { cart } = useCart();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logoa.png')}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
          <Text>🛒 {cart.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---------- Drawer ----------
function CustomDrawerContent({ navigation }) {
  const [menOpen, setMenOpen] = useState(false);
  const [womenOpen, setWomenOpen] = useState(false);
  const [shareeOpen, setShareeOpen] = useState(false);

  const DrawerButton = ({ label, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.drawerItem, style]}>
      <Text style={styles.drawerText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView>
      <DrawerButton label="Home" onPress={() => navigation.navigate('Home')} />

      {/* Men Menu */}
      <DrawerButton label={menOpen ? 'Men -' : 'Men +'} onPress={() => setMenOpen(!menOpen)} />
      {menOpen && (
        <View style={{ paddingLeft: 20 }}>
          <DrawerButton label="T-Shirt" onPress={() => navigation.navigate('MenCategories', { filter: { category: 'Men', subCategory: 'T-Shirt' } })} />
          <DrawerButton label="Polo Shirt" onPress={() => navigation.navigate('MenCategories', { filter: { category: 'Men', subCategory: 'Polo Shirt' } })} />
          <DrawerButton label="Jeans" onPress={() => navigation.navigate('MenCategories', { filter: { category: 'Men', subCategory: 'Jeans' } })} />
          <DrawerButton label="Half Sleeve Shirt" onPress={() => navigation.navigate('MenCategories', { filter: { category: 'Men', subCategory: 'Half Sleeve Shirt' } })} />
          <DrawerButton label="Full Sleeve Shirt" onPress={() => navigation.navigate('MenCategories', { filter: { category: 'Men', subCategory: 'Full Sleeve Shirt' } })} />
        </View>
      )}

      {/* Women Menu */}
      <DrawerButton label={womenOpen ? 'Women -' : 'Women +'} onPress={() => setWomenOpen(!womenOpen)} />
      {womenOpen && (
        <View style={{ paddingLeft: 20 }}>
          <DrawerButton label={shareeOpen ? 'Sharee -' : 'Sharee +'} onPress={() => setShareeOpen(!shareeOpen)} />
          {shareeOpen && (
            <View style={{ paddingLeft: 20 }}>
              <DrawerButton label="Cotton Sharee" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Cotton' } })} />
              <DrawerButton label="Silk Sharee" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Silk' } })} />
              <DrawerButton label="Jamdani Sharee" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Jamdani' } })} />
              <DrawerButton label="Katan Sharee" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Katan' } })} />
            </View>
          )}
          <DrawerButton label="Kurti" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Kurti' } })} />
          <DrawerButton label="Pant" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Pant' } })} />
          <DrawerButton label="Shoe" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Shoe' } })} />
        </View>
      )}

      {/* Kids Menu */}
      <DrawerButton label="Kids" onPress={() => navigation.navigate('KidsCategories', { filter: { category: 'Kids' } })} />

      {/* Accessories Menu */}
      <DrawerButton label="Accessories" onPress={() => navigation.navigate('AccessoriesCategories', { filter: { category: 'Accessories' } })} />

      <DrawerButton label="Cart" onPress={() => navigation.navigate('Cart')} />
      <DrawerButton label="Profile" onPress={() => navigation.navigate('Profile')} />
    </DrawerContentScrollView>
  );
}

// ---------- Screens ----------
function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Header title="" navigation={navigation} />
      <ImageSlider navigation={navigation} />
      <CategoryCarousel navigation={navigation} />
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

function CartScreen({ navigation }) {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  return (
    <ScrollView style={styles.container}>
      <Header title="Cart" navigation={navigation} />
      <View style={{ padding: 12 }}>
        {cart.map(c => (
          <View key={c.id} style={styles.cartRow}>
            <Image source={{ uri: c.image }} style={styles.cartImg} />
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text>{c.title}</Text>
              <Text>${c.price.toFixed(2)} x {c.qty}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(c.id)} style={styles.removeBtn}><Text>❌</Text></TouchableOpacity>
          </View>
        ))}
        <View style={styles.totalRow}><Text>Total</Text><Text>${total.toFixed(2)}</Text></View>
        <TouchableOpacity style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Checkout</Text></TouchableOpacity>
        <TouchableOpacity onPress={clearCart} style={styles.ghostBtn}><Text>Clear Cart</Text></TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Header title="Profile" navigation={navigation} />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>User Profile Placeholder</Text>
      </View>
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

// ---------- Category Grid Screens ----------
function WomenCategoriesGrid({ route, navigation }) { // ✅ include navigation
  const { filter } = route.params || {};

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <Header title={filter?.subCategory || ''} navigation={navigation} />

      {/* Page Title */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 12, textAlign: 'center', }}>
        {filter?.subCategory ? `${filter.subCategory} (${filter.type || ''})` : 'WOMEN'}
      </Text>

      {/* Category Grid */}
      <CategoryGrid filter={filter} />

      {/* Footer */}
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
function MenCategoriesGrid({ route, navigation }) { // ✅ include navigation
  const { filter } = route.params || {};

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <Header title={filter?.subCategory || ''} navigation={navigation} />

      {/* Page Title */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 12, textAlign: 'center', }}>
        {filter?.subCategory ? `${filter.subCategory} (${filter.type || ''})` : 'MEN'}
      </Text>

      {/* Category Grid */}
      <CategoryGrid filter={filter} />

      {/* Footer */}
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
function KidsCategoriesGrid({ route, navigation }) { // ✅ include navigation
  const { filter } = route.params || {};

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <Header title={filter?.subCategory || ''} navigation={navigation} />

      {/* Page Title */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 12, textAlign: 'center', }}>
        {filter?.subCategory ? `${filter.subCategory} (${filter.type || ''})` : 'KIDS'}
      </Text>

      {/* Category Grid */}
      <CategoryGrid filter={filter} />

      {/* Footer */}
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
function AccessoriesCategoriesGrid({ route, navigation }) { // ✅ include navigation
  const { filter } = route.params || {};

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <Header title={filter?.subCategory || ''} navigation={navigation} />

      {/* Page Title */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 12, textAlign: 'center', }}>
        {filter?.subCategory ? `${filter.subCategory} (${filter.type || ''})` : 'Accessories'}
      </Text>

      {/* Category Grid */}
      <CategoryGrid filter={filter} />

      {/* Footer */}
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

// ---------- Navigation ----------
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerScreens() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="WomenCategories" component={WomenCategoriesGrid} />
      <Drawer.Screen name="MenCategories" component={MenCategoriesGrid} />
      <Drawer.Screen name="KidsCategories" component={KidsCategoriesGrid} />
      <Drawer.Screen name="AccessoriesCategories" component={AccessoriesCategoriesGrid} />
      
    </Drawer.Navigator>
  );
}

// ---------- App ----------
export default function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(p) {
    setCartItems(prev => {
      const found = prev.find(x => x.id === p.id);
      if (found) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
  }
  function removeFromCart(id) { setCartItems(prev => prev.filter(p => p.id !== id)); }
  function clearCart() { setCartItems([]); }

  return (
    <CartContext.Provider value={{ cart: cartItems, addToCart, removeFromCart, clearCart }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DrawerRoot" component={DrawerScreens} />
          <Stack.Screen name="WomenCategories" component={WomenCategoriesGrid} />
          <Stack.Screen name="MenCategories" component={MenCategoriesGrid} />
          <Stack.Screen name="KidsCategories" component={KidsCategoriesGrid} />
          <Stack.Screen name="AccessoriesCategories" component={AccessoriesCategoriesGrid} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#ccc' },
  menu: { fontSize: 22, fontWeight: '700' },
  headerTitle: { fontWeight: '700', fontSize: 16 },
  cartButton: { padding: 6 },
  drawerItem: { padding: 12 },
  drawerText: { fontSize: 16 },
  headerContainer: { backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 0.5 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { width: 60, height: 60, borderRadius: 8 },
  cartRow: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  cartImg: { width: 80, height: 80, borderRadius: 8 },
  removeBtn: { padding: 6 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff', borderRadius: 8, marginTop: 10 },
  primaryBtn: { backgroundColor: '#111', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  ghostBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 },
});
