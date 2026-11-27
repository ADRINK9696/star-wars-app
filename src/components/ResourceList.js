import { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Swipeable from './Swipeable';

export default function ResourceList({ items, loading, error, onRetry, emptyLabel }) {
  const [selectedItem, setSelectedItem] = useState(null);

  function showItem(item) {
    setSelectedItem(item);
  }

  function closeDialog() {
    setSelectedItem(null);
  }

  if (loading && items.length === 0) {
    return (
      <View style={styles.status}>
        <ActivityIndicator size="large" color="#FFE81F" />
        <Text style={styles.statusText}>Loading from the Star Wars API...</Text>
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <View style={styles.status}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retry} onPress={onRetry}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRetry}
            tintColor="#FFE81F"
            colors={['#FFE81F']}
          />
        }
      >
        {items.length === 0 ? (
          <Text style={styles.statusText}>{emptyLabel}</Text>
        ) : (
          items.map((item) => (
            <Swipeable key={item.url} item={item} onSwipe={showItem} />
          ))
        )}
      </ScrollView>

      <Modal
        visible={selectedItem !== null}
        transparent
        animationType="fade"
        onRequestClose={closeDialog}
      >
        <View style={styles.backdrop}>
          <View style={styles.dialog}>
            <Text style={styles.dialogLabel}>Selected</Text>
            <Text style={styles.dialogText}>{selectedItem?.title}</Text>
            {selectedItem?.detail ? <Text style={styles.dialogDetail}>{selectedItem.detail}</Text> : null}
            {selectedItem?.meta ? <Text style={styles.dialogMeta}>{selectedItem.meta}</Text> : null}
            <Pressable
              onPress={closeDialog}
              style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
              accessibilityRole="button"
              accessibilityLabel="Close item dialog"
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
  list: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    alignSelf: 'stretch',
  },
  status: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  statusText: {
    marginTop: 12,
    color: '#B8C0CC',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#F5F7FA',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  retry: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#FFE81F',
    borderRadius: 6,
  },
  retryText: {
    color: '#0B0E14',
    fontSize: 15,
    fontWeight: '700',
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
  dialogText: {
    marginTop: 12,
    color: '#FFE81F',
    fontSize: 28,
    fontWeight: '700',
  },
  dialogDetail: {
    marginTop: 12,
    color: '#F5F7FA',
    fontSize: 16,
    lineHeight: 22,
  },
  dialogMeta: {
    marginTop: 6,
    color: '#B8C0CC',
    fontSize: 14,
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
