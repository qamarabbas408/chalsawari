import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalFonts from '../styles/GlobalFonts';

const { width } = Dimensions.get('window');
const ORANGE = '#f97316';
const WHITE = '#FFFFFF';

const RIDE_OPTIONS = [
  { id: 'ride', icon: '🚗', label: 'Ride', desc: '4 seater', eta: '2 min' },
  { id: 'premium', icon: '🛡️', label: 'Premium', desc: 'Luxury ride', eta: '5 min' },
  { id: 'xl', icon: '🚐', label: 'XL', desc: 'Up to 6 seats', eta: '4 min' },
  { id: 'auto', icon: '🛺', label: 'Auto', desc: 'Best for short', eta: '1 min' },
];

const POPULAR_DESTINATIONS = [
  { icon: '🏠', label: 'Home', address: '123 Main Street, Gulshan' },
  { icon: '💼', label: 'Office', address: '456 Business Ave, Clifton' },
  { icon: '🛒', label: 'Mall', address: 'Dolmen City Mall, Hyderi' },
  { icon: '✈️', label: 'Airport', address: 'Jinnah International' },
];

export default function ExploreScreen() {
  return (
    <LinearGradient
      colors={['#0f172a', 'rgba(88,28,135,0.9)', 'rgba(88,28,135,0.6)']}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Good evening 👋</Text>
        <Text style={styles.title}>Where are you{'\n'}going today?</Text>

        <TouchableOpacity style={styles.searchBar} activeOpacity={0.85}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search destination...</Text>
        </TouchableOpacity>

        <View style={styles.rideGrid}>
          {RIDE_OPTIONS.map(option => (
            <TouchableOpacity key={option.id} style={styles.rideCard} activeOpacity={0.8}>
              <Text style={styles.rideIcon}>{option.icon}</Text>
              <Text style={styles.rideLabel}>{option.label}</Text>
              <Text style={styles.rideDesc}>{option.desc}</Text>
              <Text style={styles.rideEta}>{option.eta}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Popular Places</Text>

        <View style={styles.destinationsList}>
          {POPULAR_DESTINATIONS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.destinationItem}
              activeOpacity={0.8}
            >
              <View style={styles.destIconCircle}>
                <Text style={styles.destIcon}>{item.icon}</Text>
              </View>
              <View style={styles.destInfo}>
                <Text style={styles.destLabel}>{item.label}</Text>
                <Text style={styles.destAddress}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 90,
  },
  greeting: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4,
  },
  title: {
    fontFamily: GlobalFonts.Montserrat.Bold,
    fontSize: 26,
    color: WHITE,
    lineHeight: 34,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 28,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchPlaceholder: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.35)',
  },
  rideGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  rideCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 16,
  },
  rideIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  rideLabel: {
    fontFamily: GlobalFonts.Inter.SemiBold,
    fontSize: 15,
    color: WHITE,
    marginBottom: 2,
  },
  rideDesc: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 6,
  },
  rideEta: {
    fontFamily: GlobalFonts.Montserrat.Bold,
    fontSize: 12,
    color: ORANGE,
  },
  sectionTitle: {
    fontFamily: GlobalFonts.Montserrat.Bold,
    fontSize: 18,
    color: WHITE,
    marginBottom: 16,
  },
  destinationsList: {
    gap: 10,
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 14,
    gap: 14,
  },
  destIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destIcon: {
    fontSize: 18,
  },
  destInfo: {
    flex: 1,
  },
  destLabel: {
    fontFamily: GlobalFonts.Inter.SemiBold,
    fontSize: 14,
    color: WHITE,
    marginBottom: 2,
  },
  destAddress: {
    fontFamily: GlobalFonts.Inter.Regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
});
