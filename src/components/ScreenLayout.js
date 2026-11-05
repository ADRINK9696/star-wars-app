import { StyleSheet, Text, View } from 'react-native';

export default function ScreenLayout({ title, detail }) {
  return (
    <View style={styles.screen}>
      <View style={styles.banner}>
        <Text style={styles.brand}>STAR WARS</Text>
        <Text style={styles.bannerTitle}>{title}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.screenName}>{title}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Lookup screen</Text>
        <Text style={styles.footerName}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0E14',
  },
  banner: {
    paddingTop: 28,
    paddingBottom: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  screenName: {
    color: '#FFE81F',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
  detail: {
    marginTop: 12,
    color: '#B8C0CC',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#12171F',
    borderTopWidth: 1,
    borderTopColor: '#2A3340',
  },
  footerText: {
    color: '#8B95A7',
    fontSize: 14,
  },
  footerName: {
    color: '#FFE81F',
    fontSize: 14,
    fontWeight: '700',
  },
});
