import { StyleSheet, Text, View } from 'react-native';

export default function ScreenLayout({ title, children }) {
  return (
    <View style={styles.screen}>
      <View style={styles.banner}>
        <Text style={styles.brand}>STAR WARS</Text>
        <Text style={styles.bannerTitle}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0E14',
  },
  banner: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: '#12171F',
    borderBottomWidth: 1,
    borderBottomColor: '#2A3340',
  },
  brand: {
    color: '#FFE81F',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
  },
  bannerTitle: {
    marginTop: 6,
    color: '#F5F7FA',
    fontSize: 28,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
});
