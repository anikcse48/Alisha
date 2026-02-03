import 'react-native-gesture-handler';
import React, { useState, useContext, createContext, useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Dimensions, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './Footer'; // ✅ import Footer from separate file
import ImageSlider from './ImageSlider';
import CategoryCarousel from './CategoryCarousel'; // the carousel we just created
import CategoryGrid from './components/CategoryGrid';

// ---------- Sample Product Data ----------
const sampleProducts = [
  { id: 'p1', title: 'Cotton Sharee', category: 'Women', subCategory: 'Sharee', type: 'Cotton', price: 42.99, image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTAPH-Lfth4UNBo_0YwcKg6CnsjzZXVfnuGCNRiiDjSO7o2HyHE' },
  { id: 'p2', title: 'Silk Sharee', category: 'Women', subCategory: 'Sharee', type: 'Silk', price: 55.0, image: 'https://via.placeholder.com/600x800.png?text=Silk+Sharee' },
  { id: 'p3', title: 'Men T-Shirt', category: 'Men', subCategory: 'T-Shirt', price: 25.0, image: 'https://via.placeholder.com/600x800.png?text=Men+T-Shirt' },
  { id: 'p4', title: 'Men Polo Shirt', category: 'Men', subCategory: 'Polo Shirt', price: 30.0, image: 'https://via.placeholder.com/600x800.png?text=Men+Polo' },
];

// ---------- Cart Context ----------
const CartContext = createContext();
function useCart() { return useContext(CartContext); }

const { width: SCREEN_WIDTH } = Dimensions.get('window');
function numColumnsForWidth(w = SCREEN_WIDTH) {
  if (w >= 1000) return 4;
  if (w >= 700) return 3;
  if (w >= 420) return 2;
  return 1;
}

// ---------- Header ----------
// ---------- Header ----------
function Header({ title, navigation }) {
  const { cart } = useCart();
  return (
    <View style={styles.headerContainer}>
      {/* Top Banner */}
     

      {/* Header Row with Logo + Menu + Cart */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>

        {/* Logo + Title */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../Alisha_Achol/assets/logoa.png')}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        {/* Cart Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
          <Text>🛒 {cart.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


// ---------- Product Card ----------
function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ---------- Product List ----------
function ProductList({ navigation, filter }) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    let result = sampleProducts;
    if (filter?.category) result = result.filter(p => p.category === filter.category);
    if (filter?.subCategory) result = result.filter(p => p.subCategory === filter.subCategory);
    if (filter?.type) result = result.filter(p => p.type === filter.type);
    if (q.trim()) result = result.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    return result;
  }, [filter, q]);

  const numColumns = numColumnsForWidth(SCREEN_WIDTH);
  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      <TextInput placeholder="Search products..." value={q} onChangeText={setQ} style={styles.search} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} onPress={() => navigation.navigate('Product', { product: item })} />}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? { justifyContent: 'space-between' } : undefined}
        style={{ marginTop: 12 }}
      />
    </ScrollView>
  );
}

// ---------- Custom Drawer ----------
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
      <DrawerButton label={menOpen ? 'Men  -' : 'Men +'} onPress={() => setMenOpen(!menOpen)} />
      {menOpen && (
        <View style={{ paddingLeft: 20 }}>
          <DrawerButton label="T-Shirt" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Men', subCategory: 'T-Shirt' } })} />
          <DrawerButton label="Polo Shirt" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Men', subCategory: 'Polo Shirt' } })} />
          <DrawerButton label="Jeans" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Men', subCategory: 'Jeans' } })} />
          <DrawerButton label="Half Sleeve Shirt" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Men', subCategory: 'Half Sleeve Shirt' } })} />
          <DrawerButton label="Full Sleeve Shirt" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Men', subCategory: 'Full Sleeve Shirt' } })} />
        </View>
      )}

      {/* Women Menu */}
      <DrawerButton label={womenOpen ? 'Women -' : 'Women +'} onPress={() => setWomenOpen(!womenOpen)} />
      {womenOpen && (
        <View style={{ paddingLeft: 20 }}>
          <DrawerButton label={shareeOpen ? 'Sharee -' : 'Sharee +'} onPress={() => setShareeOpen(!shareeOpen)} />
          {shareeOpen && (
            <View style={{ paddingLeft: 20 }}>
              <DrawerButton label="Cotton Sharee" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Cotton' } })} />
              <DrawerButton label="Silk Sharee" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Silk' } })} />
              <DrawerButton label="Jamdani Sharee" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Jamdani' } })} />
              <DrawerButton label="Katan Sharee" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Katan' } })} />
            </View>
          )}
          <DrawerButton label="Kurti" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Women', subCategory: 'Kurti' } })} />
          <DrawerButton label="Pant" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Women', subCategory: 'Pant' } })} />
          <DrawerButton label="Shoe" onPress={() => navigation.navigate('ProductsFiltered', { filter: { category: 'Women', subCategory: 'Shoe' } })} />
        </View>
      )}

      <DrawerButton label="Cart" onPress={() => navigation.navigate('Cart')} />
      <DrawerButton label="Profile" onPress={() => navigation.navigate('Profile')} />
    </DrawerContentScrollView>
  );
}

// ---------- Footer Component ----------



// ---------- Screens ----------
function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Header title="" navigation={navigation} />
      <ImageSlider navigation={navigation} /> 
      {/* Category Carousel */}
      <CategoryCarousel navigation={navigation} />
      <CategoryGrid navigation={navigation} />

      <ProductList navigation={navigation} filter={{}} />
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

function ProductsFilteredScreen({ route, navigation }) {
  const { filter } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Header title="" navigation={navigation} />
      <ProductList navigation={navigation} filter={filter} />
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

function ProductScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  return (
    <ScrollView style={styles.container}>
      <Header title={product.title} navigation={navigation} />
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <Image source={{ uri: product.image }} style={styles.prodImage} />
        <Text style={styles.prodTitle}>{product.title}</Text>
        <Text style={styles.prodPrice}>${product.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => { addToCart(product); navigation.navigate('Cart'); }}>
          <Text style={styles.primaryBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
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
      <ScrollView contentContainerStyle={{ padding: 12 }}>
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
      </ScrollView>
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

// ---------- Navigation ----------
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerScreens() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="ProductsFiltered" component={ProductsFilteredScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

// ---------- App ----------
export default function App() {
  const [cartItems, setCartItems] = useState([]);
  function addToCart(p) { setCartItems(prev => { const f = prev.find(x => x.id === p.id); if (f) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x); return [...prev, { ...p, qty: 1 }]; }); }
  function removeFromCart(id) { setCartItems(prev => prev.filter(p => p.id !== id)); }
  function clearCart() { setCartItems([]); }

  return (
    <CartContext.Provider value={{ cart: cartItems, addToCart, removeFromCart, clearCart }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DrawerRoot" component={DrawerScreens} />
          <Stack.Screen name="Product" component={ProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
}




// ---------- Main Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#ccc' },
  menu: { fontSize: 22, fontWeight: '700' },
  headerTitle: { fontWeight: '700', fontSize: 16 },
  cartButton: { padding: 6 },
  search: { height: 40, backgroundColor: '#fff', borderRadius: 8, borderWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10 },
  card: { backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', marginBottom: 12, flex: 1, marginHorizontal: 6 },
  cardImage: { width: '100%', height: 220 },
  cardBody: { padding: 10 },
  cardTitle: { fontWeight: '700' },
  cardPrice: { marginTop: 4 },
  prodImage: { width: '100%', height: 400, borderRadius: 8 },
  prodTitle: { fontSize: 20, fontWeight: '800', marginTop: 12 },
  prodPrice: { fontSize: 18, fontWeight: '700', marginTop: 6 },
  primaryBtn: { backgroundColor: '#111', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  ghostBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  cartRow: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  cartImg: { width: 80, height: 80, borderRadius: 8 },
  removeBtn: { padding: 6 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff', borderRadius: 8, marginTop: 10 },
  drawerItem: { padding: 12 },
  drawerText: { fontSize: 16 },

  headerContainer: {
  backgroundColor: '#fff',
  borderBottomColor: '#ccc',
  borderBottomWidth: 0.5,
},
headerBanner: {
  width: '100%',
  height: 120, // adjust height as you like
},
logoContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},
logo: {
  width: 60,
  height: 60,
  borderRadius: 8,
},

});
