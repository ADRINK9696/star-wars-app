import { useState } from 'react';
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LazyImage from './LazyImage';
import NetworkStatus from './NetworkStatus';

const GALAXY_URI = 'https://images-assets.nasa.gov/image/PIA04921/PIA04921~medium.jpg';

export default function ScreenLayout({ title, children }) {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  function submitSearch() {
    const term = query.trim();
    if (!term) {
      return;
    }

    Keyboard.dismiss();
    setSubmittedQuery(term);
    setDialogVisible(true);
  }

  function closeDialog() {
    setDialogVisible(false);
  }

  return (
    <View style={styles.screen}>
      <NetworkStatus />
      <View style={styles.banner}>
        <LazyImage
          style={styles.hero}
          resizeMode="cover"
          source={{ uri: GALAXY_URI }}
          accessibilityLabel="The Sombrero Galaxy"
        />
        <View style={styles.bannerBody}>
          <Text style={styles.brand}>STAR WARS</Text>
          <Text style={styles.bannerTitle}>{title}</Text>
          <View style={styles.searchRow}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={submitSearch}
              placeholder={`Search ${title.toLowerCase()}`}
              placeholderTextColor="#8B95A7"
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              accessibilityLabel={`Search ${title}`}
            />
            <Pressable
              onPress={submitSearch}
              style={({ pressed }) => [styles.searchButton, pressed && styles.searchButtonPressed]}
              accessibilityRole="button"
              accessibilityLabel="Submit search"
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.content}>{children}</View>

      <Modal
        visible={dialogVisible}
        transparent
        animationType="fade"
        onRequestClose={closeDialog}
      >
        <View style={styles.backdrop}>
          <View style={styles.dialog}>
            <Text style={styles.dialogLabel}>You searched for</Text>
            <Text style={styles.dialogQuery}>{submittedQuery}</Text>
            <Pressable
              onPress={closeDialog}
              style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
              accessibilityRole="button"
              accessibilityLabel="Close search dialog"
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0E14',
  },
  banner: {
    backgroundColor: '#12171F',
    borderBottomWidth: 1,
    borderBottomColor: '#2A3340',
  },
  hero: {
    width: '100%',
    height: 168,
    backgroundColor: '#0B0E14',
    overflow: 'hidden',
  },
  bannerBody: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 44,
    marginRight: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A3340',
    backgroundColor: '#0B0E14',
    color: '#F5F7FA',
    fontSize: 16,
  },
  searchButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFE81F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonPressed: {
    opacity: 0.5,
  },
  searchButtonText: {
    color: '#0B0E14',
    fontSize: 15,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  dialog: {
    width: '100%',
    maxWidth: 360,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderRadius: 12,
    backgroundColor: '#12171F',
    borderWidth: 1,
    borderColor: '#FFE81F',
  },
  dialogLabel: {
    color: '#8B95A7',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dialogQuery: {
    marginTop: 12,
    color: '#FFE81F',
    fontSize: 28,
    fontWeight: '700',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFE81F',
  },
  closeButtonPressed: {
    opacity: 0.5,
  },
  closeButtonText: {
    color: '#0B0E14',
    fontSize: 15,
    fontWeight: '700',
  },
});
