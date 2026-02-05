import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

export default function Footer() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>

      {/* ===== TOP SECTION ===== */}
      <View style={styles.topSection}>
        <View style={styles.featureBox}>
          <Image source={require('./assets/fast-shipping.png')} style={styles.icon} />
          <Text style={styles.featureTitle}>Fast Delivery</Text>
          <Text style={styles.featureText}>
            Get fast and hassle-free delivery of your orders.
          </Text>
          <Text style={styles.featureLink}>Learn More</Text>
        </View>

        <View style={styles.featureBox}>
          <Image source={require('./assets/megaphone.png')} style={styles.icon} />
          <Text style={styles.featureTitle}>Super Deals</Text>
          <Text style={styles.featureText}>
            Latest news, offers and campaigns.
          </Text>
          <Text style={styles.featureLink}>Learn More</Text>
        </View>

        <View style={styles.featureBox}>
          <Image source={require('./assets/rewards.png')} style={styles.icon} />
          <Text style={styles.featureTitle}>Alisha_আঁচল</Text>
          <Text style={styles.featureText}>
            Unlock exclusive rewards and benefits.
          </Text>
          <Text style={styles.featureLink}>Learn More</Text>
        </View>

        <View style={styles.featureBox}>
          <Text style={[styles.featureTitle, { marginBottom: 8 }]}>
            Stay Connected
          </Text>
          <View style={styles.iconRow}>
            <FontAwesome name="facebook" size={24} color="#3b5998" style={styles.socialIcon} />
            <FontAwesome name="instagram" size={24} color="#E1306C" style={styles.socialIcon} />
            <FontAwesome name="youtube-play" size={24} color="#FF0000" style={styles.socialIcon} />
            <FontAwesome name="linkedin" size={24} color="#0077B5" style={styles.socialIcon} />
          </View>
          <Text style={styles.featureText}>
            Follow us on social media.
          </Text>
        </View>
      </View>

      {/* ===== MIDDLE SECTION ===== */}
      <View style={styles.middleSection}>

        {/* Newsletter */}
        <View style={styles.middleBox}>
          <Text style={styles.featureTitle}>Sign up and Stay Updated</Text>
          <Text style={styles.featureText}>
            Get product launches and offers.
          </Text>
          <View style={styles.newsletterRow}>
  <TextInput
    placeholder="Enter your email"
    style={styles.emailInput}
  />
  <TouchableOpacity style={styles.submitButton}>
    <Text style={styles.submitText}>→</Text>
  </TouchableOpacity>
</View>
        </View>

        {/* Help */}
        <View style={styles.middleBox}>
          <Text style={styles.featureTitle}>Help</Text>
          <Text style={styles.listItem}>Terms & Conditions</Text>
          <Text style={styles.listItem}>Shipping & Delivery</Text>
          <Text style={styles.listItem}>How to order</Text>
          <Text style={styles.listItem}>Exchange & Return Policy</Text>
          <Text style={styles.listItem}>Warranty Policy</Text>
          <Text style={styles.listItem}>Privacy Policy</Text>
        </View>

        {/* ===== ABOUT + PAYMENT (CENTERED SAME ROW) ===== */}
        <View style={styles.aboutPaymentRow}>

          {/* About */}
          <View style={styles.aboutBox}>
            <Text style={styles.featureTitle}>About Alisha_আঁচল</Text>
            <Text style={styles.listItem}>About Us</Text>
            <Text style={styles.listItem}>Blog</Text>
            <Text style={styles.listItem}>Sustainability</Text>
            <Text style={styles.listItem}>Press Release</Text>
            <Text style={styles.listItem}>Contact Us</Text>
            <Text style={styles.listItem}>FAQ's</Text>
          </View>

          {/* Payment */}
          <View style={styles.paymentBox}>
            <View style={styles.paymentRow}>
              <FontAwesome5 name="cc-visa" size={36} style={styles.paymentIconFont} />
              <FontAwesome5 name="cc-mastercard" size={36} style={styles.paymentIconFont} />
              <FontAwesome5 name="cc-amex" size={36} style={styles.paymentIconFont} />
            </View>
            <View style={styles.paymentRow}>
              <Image source={require('./assets/bkash.png')} style={styles.paymentIcon} />
              <Image source={require('./assets/nagad.png')} style={styles.paymentIcon} />
              <Image source={require('./assets/rocket.png')} style={styles.paymentIcon} />
            </View>
          </View>

        </View>
      </View>

      {/* ===== BOTTOM ===== */}
      <View style={styles.bottomSection}>
        <Text style={{ color: '#472424', fontWeight: '300', textAlign: 'center', fontSize: 14, fontFamily: 'serif', }}>
          © 2025 Alisha_আঁচল - All right reserved | Designed & Developed by Rk Anik| privacy policy & cookies | terms & conditions
        </Text>
      </View>

    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },

  /* Top */
  topSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  featureBox: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  featureTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  featureLink: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    marginBottom: 6,
    justifyContent: 'center',
  },
  socialIcon: {
    marginHorizontal: 8,
  },

  /* Middle */
  middleSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  middleBox: {
    width: '48%',
    marginVertical: 10,
  },
  listItem: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  newsletterRow: {
  flexDirection: 'row',        // ✅ one row
  alignItems: 'center',        // ✅ vertical center
  justifyContent: 'center',    // ✅ horizontal center
  marginTop: 10,
  width: '100%',
},

emailInput: {
  width: 130,                  // ✅ fixed width (important for web)
  height: 30,
  borderWidth: 1,
  borderColor: '#ccc',
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  paddingHorizontal: 10,
},

submitButton: {
  height: 30,                  // ✅ same height as input
  width: 36,
  backgroundColor: '#111',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
},

submitText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '600',
},

  /* About + Payment */
  aboutPaymentRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  aboutBox: {
    width: '48%',
    alignItems: 'center',
  },
  paymentBox: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  paymentIcon: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 8,
  },
  paymentIconFont: {
    marginHorizontal: 8,
  },

  /* Bottom */
 bottomSection: {
    backgroundColor: '#fffcfc',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
