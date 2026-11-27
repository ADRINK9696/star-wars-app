import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';

export default function Swipeable({ item, onSwipe }) {
  const scrollRef = useRef(null);
  const revealed = useRef(false);
  const [pageWidth, setPageWidth] = useState(0);

  function onLayout(event) {
    const nextWidth = Math.round(event.nativeEvent.layout.width);
    if (nextWidth > 0 && nextWidth !== pageWidth) {
      setPageWidth(nextWidth);
    }
  }

  function onScroll(event) {
    const offset = event.nativeEvent.contentOffset.x;
    const width = pageWidth || event.nativeEvent.layoutMeasurement?.width || 0;
    if (width === 0) {
      return;
    }

    if (offset < width * 0.5) {
      revealed.current = false;
      return;
    }

    if (!revealed.current && offset >= width - 2) {
      revealed.current = true;
      onSwipe(item);
      scrollRef.current?.scrollTo({ x: 0, animated: false });
    }
  }

  const scrollProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    scrollEventThrottle: 10,
    onScroll,
  };

  return (
    <Animated.View
      entering={SlideInLeft.duration(400)}
      style={styles.swipeContainer}
      onLayout={onLayout}
    >
      {pageWidth > 0 ? (
        <ScrollView ref={scrollRef} style={{ width: pageWidth }} {...scrollProps}>
          <TouchableOpacity activeOpacity={0.6}>
            <View style={[styles.swipeItem, { width: pageWidth }]}>
              <Text style={styles.title}>{item.title}</Text>
              {item.detail ? <Text style={styles.detail}>{item.detail}</Text> : null}
              {item.meta ? <Text style={styles.meta}>{item.meta}</Text> : null}
            </View>
          </TouchableOpacity>
          <View style={[styles.swipeBlank, { width: pageWidth }]} />
        </ScrollView>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    alignSelf: 'stretch',
  },
  swipeItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#0B0E14',
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
  swipeBlank: {
    height: 30,
  },
});
