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
  useWindowDimensions,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // vector icons

import Footer from './Footer';
import ImageSlider from './ImageSlider';
import CategoryCarousel from './CategoryCarousel';
import CategoryGrid from './components/CategoryGrid';


// ---------- Cart Context ----------
const CartContext = createContext();
function useCart() { return useContext(CartContext); }


// ---------- Header (Responsive) ----------

function Header({ title, navigation }) {
  const { cart } = useCart();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const navLinks = ['Women', 'Men', 'Kids', 'Accessories', 'Home Decor', 'About Us'];

  return (
    <View style={styles.headerContainer}>

      {/* Top Row */}
      {/* Top Row */}
<View style={styles.topRow}>
  <View style={styles.left}>
    {/* ALWAYS SHOW MENU */}
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Text style={styles.menu}>☰</Text>
    </TouchableOpacity>

    {/* LOCATION ICON */}
    <TouchableOpacity style={{ marginLeft: 10 }}>
      <Ionicons name="location-outline" size={24} color="black" />
    </TouchableOpacity>
  </View>

  {/* CENTER LOGO */}
  <View style={styles.center}>
    <Image source={require('./assets/logoa.png')} style={styles.logo} />
  </View>

  {/* RIGHT ICONS */}
  <View style={styles.right}>
    <TouchableOpacity style={{ marginHorizontal: 8 }}>
      <Ionicons name="search" size={24} color="black" />
    </TouchableOpacity>

    <TouchableOpacity style={{ marginHorizontal: 8 }}>
      <FontAwesome name="heart-o" size={24} color="black" />
    </TouchableOpacity>

    <TouchableOpacity style={{ marginHorizontal: 8 }} onPress={() => navigation.navigate('Cart')}>
      <Text style={{ fontSize: 16 }}>🛒 {cart.length}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{ marginHorizontal: 8 }}>
      <MaterialIcons name="person-outline" size={24} color="black" />
    </TouchableOpacity>
  </View>
</View>


      {/* Desktop Horizontal Navigation */}
      {isDesktop && (
        <ScrollView horizontal contentContainerStyle={styles.navRow} showsHorizontalScrollIndicator={false}>
          {navLinks.map((link) => (
            <TouchableOpacity
              key={link}
              style={styles.navItem}
              onPress={() => {
                switch (link) {
                  case 'Women':
                    navigation.navigate('WomenCategories', { filter: { category: 'Women' } });
                    break;
                  case 'Men':
                    navigation.navigate('MenCategories', { filter: { category: 'Men' } });
                    break;
                  case 'Kids':
                    navigation.navigate('KidsCategories', { filter: { category: 'Kids' } });
                    break;
                  case 'Accessories':
                    navigation.navigate('AccessoriesCategories', { filter: { category: 'Accessories' } });
                    break;
                  default:
                    break;
                }
              }}
            >
              <Text style={[styles.navText, link === '' && { color: 'red', fontWeight: 'bold' }]}>{link}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}




// ---------- Drawer ----------
function CustomDrawerContent({ navigation }) {
  const [menOpen, setMenOpen] = useState(false);
  const [womenOpen, setWomenOpen] = useState(false);
  const [shareeOpen, setShareeOpen] = useState(false);

  const DrawerButton = ({ label, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.drawerItem}>
      <Text style={styles.drawerText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView>

      {/* Logo Top */}
      <View style={{ padding: 20 }}>
        <Image
          source={require('./assets/logoa.png')}
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
        />
      </View>

      <DrawerButton label="Home" onPress={() => navigation.navigate('Home')} />

      {/* Men */}
      <DrawerButton label={menOpen ? 'Men -' : 'Men +'} onPress={() => setMenOpen(!menOpen)} />
      {menOpen && (
        <View style={{ paddingLeft: 20 }}>
          <DrawerButton label="T-Shirt" onPress={() => navigation.navigate('MenCategories', { filter: { category: 'Men', subCategory: 'T-Shirt' } })} />
          <DrawerButton label="Polo Shirt" onPress={() => navigation.navigate('MenCategories', { filter: { category: 'Men', subCategory: 'Polo Shirt' } })} />
          <DrawerButton label="Jeans" onPress={() => navigation.navigate('MenCategories', { filter: { category: 'Men', subCategory: 'Jeans' } })} />
        </View>
      )}

      {/* Women */}
      <DrawerButton label={womenOpen ? 'Women -' : 'Women +'} onPress={() => setWomenOpen(!womenOpen)} />
      {womenOpen && (
        <View style={{ paddingLeft: 20 }}>
          <DrawerButton label={shareeOpen ? 'Sharee -' : 'Sharee +'} onPress={() => setShareeOpen(!shareeOpen)} />

          {shareeOpen && (
            <View style={{ paddingLeft: 20 }}>
              <DrawerButton label="Cotton Sharee" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Cotton' } })} />
              <DrawerButton label="Silk Sharee" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Silk' } })} />
              <DrawerButton label="Jamdani Sharee" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Sharee', type: 'Jamdani' } })} />
            </View>
          )}

          <DrawerButton label="Kurti" onPress={() => navigation.navigate('WomenCategories', { filter: { category: 'Women', subCategory: 'Kurti' } })} />
        </View>
      )}

      <DrawerButton label="Kids" onPress={() => navigation.navigate('KidsCategories', { filter: { category: 'Kids' } })} />
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
      <Header navigation={navigation} />
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
            <View style={{ flex: 1 }}>
              <Text>{c.title}</Text>
              <Text>${c.price} x {c.qty}</Text>
            </View>

            <TouchableOpacity onPress={() => removeFromCart(c.id)}>
              <Text>❌</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text>Total: ${total}</Text>
      </View>

      <Footer navigation={navigation} />
    </ScrollView>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Header title="Profile" navigation={navigation} />
      <Footer navigation={navigation} />
    </ScrollView>
  );
}


// ---------- Category Grid Screens ----------

function WomenCategoriesGrid({ route, navigation }) {
  // ✅ include navigation
  const { filter } = route.params || {};

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <Header title={filter?.subCategory || ''} navigation={navigation} />

      {/* Page Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          padding: 12,
          textAlign: 'center',
        }}
      >
        {filter?.subCategory ? `${filter.subCategory} (${filter.type || ''})` : 'WOMEN'}
      </Text>

      {/* Category Grid */}
      <CategoryGrid filter={filter} />

      {/* Footer */}
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

function MenCategoriesGrid({ route, navigation }) {
  // ✅ include navigation
  const { filter } = route.params || {};

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <Header title={filter?.subCategory || ''} navigation={navigation} />

      {/* Page Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          padding: 12,
          textAlign: 'center',
        }}
      >
        {filter?.subCategory ? `${filter.subCategory} (${filter.type || ''})` : 'MEN'}
      </Text>

      {/* Category Grid */}
      <CategoryGrid filter={filter} />

      {/* Footer */}
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

function KidsCategoriesGrid({ route, navigation }) {
  // ✅ include navigation
  const { filter } = route.params || {};

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <Header title={filter?.subCategory || ''} navigation={navigation} />

      {/* Page Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          padding: 12,
          textAlign: 'center',
        }}
      >
        {filter?.subCategory ? `${filter.subCategory} (${filter.type || ''})` : 'KIDS'}
      </Text>

      {/* Category Grid */}
      <CategoryGrid filter={filter} />

      {/* Footer */}
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

function AccessoriesCategoriesGrid({ route, navigation }) {
  // ✅ include navigation
  const { filter } = route.params || {};

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}
      <Header title={filter?.subCategory || ''} navigation={navigation} />

      {/* Page Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          padding: 12,
          textAlign: 'center',
        }}
      >
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
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',  // ✅ Sidebar slide-in/out for all devices
        drawerStyle: { width: 260 },
      }}
    >
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

  return (
    <CartContext.Provider value={{ cart: cartItems }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DrawerRoot" component={DrawerScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
}


// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },

  headerContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  menu: { fontSize: 22, fontWeight: '700' },

  headerTitle: { fontSize: 16, fontWeight: '700' },

  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  logo: { width: 60, height: 60 },

  drawerItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
  },

  drawerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  cartRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  cartImg: { width: 80, height: 80 },
  topRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 10,
},

left: { flexDirection: 'row', alignItems: 'center' },
center: { flex: 1, alignItems: 'center' },
right: { flexDirection: 'row', alignItems: 'center' },



navRow: {
    flexDirection: 'row',
    justifyContent: 'center',   // <-- centers nav items horizontally
    alignItems: 'center',       // vertically center
    paddingHorizontal: 350,
    paddingVertical: 5,
  },
  navItem: {
    marginHorizontal: 20,       // spacing between nav items
    justifyContent: 'center',   // vertically center text
    alignItems: 'center',
    height: 20,                 // consistent row height
  },
  navText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5f2727',
  },
});
