import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const connectedMap = {
  none: 'Disconnected',
  unknown: 'Disconnected',
  wifi: 'Connected',
  cellular: 'Connected',
  cell: 'Connected',
  mobile: 'Connected',
  bluetooth: 'Disconnected',
  ethernet: 'Connected',
  wimax: 'Connected',
  vpn: 'Connected',
  other: 'Connected',
};

function isOffline(connection) {
  if (!connection) {
    return false;
  }

  if (connection.isConnected === true && connection.isInternetReachable !== false) {
    return false;
  }

  if (connection.isConnected === false || connection.isInternetReachable === false) {
    return true;
  }

  return connectedMap[connection.type] === 'Disconnected';
}

export default function NetworkStatus() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    function onNetworkChange(connection) {
      setOffline(isOffline(connection));
    }

    const unsubscribe = NetInfo.addEventListener(onNetworkChange);
    NetInfo.fetch().then(onNetworkChange);

    return () => {
      unsubscribe();
    };
  }, []);

  if (!offline) {
    return null;
  }

  return (
    <View style={styles.banner} accessibilityRole="alert">
      <Text style={styles.title}>No network connection</Text>
      <Text style={styles.message}>
        The galaxy is out of reach. Reconnect to load planets, spaceships, and films.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#3A2410',
    borderBottomWidth: 1,
    borderBottomColor: '#FFE81F',
  },
  title: {
    color: '#FFE81F',
    fontSize: 16,
    fontWeight: '700',
  },
  message: {
    marginTop: 4,
    color: '#F5F7FA',
    fontSize: 14,
    lineHeight: 20,
  },
});
