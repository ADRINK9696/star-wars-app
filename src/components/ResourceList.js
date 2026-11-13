import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ResourceList({ items, loading, error, onRetry, emptyLabel }) {
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
    <FlatList
      data={items}
      keyExtractor={(item) => item.url}
      contentContainerStyle={items.length === 0 ? styles.emptyContainer : undefined}
      refreshing={loading}
      onRefresh={onRetry}
      ListEmptyComponent={<Text style={styles.statusText}>{emptyLabel}</Text>}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          {item.detail ? <Text style={styles.detail}>{item.detail}</Text> : null}
          {item.meta ? <Text style={styles.meta}>{item.meta}</Text> : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
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
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A3340',
  },
  title: {
    color: '#F5F7FA',
    fontSize: 18,
    fontWeight: '700',
  },
  detail: {
    marginTop: 4,
    color: '#B8C0CC',
    fontSize: 15,
    lineHeight: 21,
  },
  meta: {
    marginTop: 4,
    color: '#FFE81F',
    fontSize: 13,
  },
});
