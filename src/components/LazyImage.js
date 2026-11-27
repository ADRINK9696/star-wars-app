import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const placeholder = require('../../assets/placeholder.png');

function Placeholder({ loaded, resizeMode }) {
  if (loaded) {
    return null;
  }

  return (
    <Image
      style={StyleSheet.absoluteFill}
      source={placeholder}
      resizeMode={resizeMode}
      accessible={false}
    />
  );
}

export default function LazyImage({ style, source, resizeMode = 'cover', accessibilityLabel }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style}>
      <Placeholder loaded={loaded} resizeMode={resizeMode} />
      <Image
        accessibilityLabel={accessibilityLabel}
        style={StyleSheet.absoluteFill}
        source={source}
        resizeMode={resizeMode}
        onLoad={() => setLoaded(true)}
      />
    </View>
  );
}
