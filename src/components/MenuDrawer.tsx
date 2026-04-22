import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { House, Info, X } from 'phosphor-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FontSizeMenu } from './FontSizeMenu';
import { LanguageMenu } from './LanguageMenu';

interface MenuDrawerProps {
  visible: boolean;
  activeScreen: 'home' | 'verseList' | 'verseDetail' | 'samputSelection' | 'samputReading' | 'search' | 'about';
  onClose: () => void;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 340);

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  visible,
  activeScreen,
  onClose,
  onNavigateHome,
  onNavigateAbout,
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -DRAWER_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, slideAnim]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <Animated.View
        style={[
          styles.drawer,
          {
            backgroundColor: colors.surface,
            borderRightColor: colors.border,
            transform: [{ translateX: slideAnim }],
            width: DRAWER_WIDTH,
          },
        ]}
      >
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.spiritual }]}>{t.menu.title}</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>{t.menu.settings}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.text} weight="bold" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.navigationGroup, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t.menu.navigate}</Text>

            <TouchableOpacity
              style={[
                styles.navButton,
                {
                  backgroundColor: activeScreen === 'home' ? colors.primaryContainer : colors.surfaceVariant,
                  borderColor: activeScreen === 'home' ? colors.primary : colors.border,
                },
              ]}
              onPress={onNavigateHome}
            >
              <House size={18} color={colors.spiritual} weight="bold" />
              <Text style={[styles.navButtonText, { color: colors.text }]}>{t.navigation.home}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                {
                  backgroundColor: activeScreen === 'about' ? colors.primaryContainer : colors.surfaceVariant,
                  borderColor: activeScreen === 'about' ? colors.primary : colors.border,
                },
              ]}
              onPress={onNavigateAbout}
            >
              <Info size={18} color={colors.spiritual} weight="bold" />
              <Text style={[styles.navButtonText, { color: colors.text }]}>{t.navigation.about}</Text>
            </TouchableOpacity>
          </View>

          <LanguageMenu />
          <FontSizeMenu />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    elevation: 999,
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 24,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 56,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  navigationGroup: {
    padding: 16,
    borderBottomWidth: 1,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
