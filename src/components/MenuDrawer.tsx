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
import { BookOpenText, House, X } from 'phosphor-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useFontSize } from '../contexts/FontSizeContext';
import { FontSizeMenu } from './FontSizeMenu';
import { LanguageMenu } from './LanguageMenu';

interface MenuDrawerProps {
  visible: boolean;
  activeScreen: 'home' | 'verseList' | 'verseDetail' | 'samputSelection' | 'samputReading' | 'search' | 'history';
  onClose: () => void;
  onNavigateHome: () => void;
  onNavigateHistory: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 340);

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  visible,
  activeScreen,
  onClose,
  onNavigateHome,
  onNavigateHistory,
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { scaleFontSize } = useFontSize();
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const [isMounted, setIsMounted] = React.useState(visible);

  React.useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
      return;
    }

    if (isMounted) {
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setIsMounted(false);
        }
      });
    }
  }, [isMounted, slideAnim, visible]);

  if (!isMounted) {
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
            <Text style={[styles.headerTitle, { color: colors.spiritual, fontSize: scaleFontSize(24) }]}>{t.menu.title}</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary, fontSize: scaleFontSize(13) }]}>{t.menu.settings}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.text} weight="bold" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.navigationGroup, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: scaleFontSize(12) }]}>{t.menu.navigate}</Text>

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
              <Text style={[styles.navButtonText, { color: colors.text, fontSize: scaleFontSize(15) }]}>{t.navigation.home}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                {
                  backgroundColor: activeScreen === 'history' ? colors.primaryContainer : colors.surfaceVariant,
                  borderColor: activeScreen === 'history' ? colors.primary : colors.border,
                },
              ]}
              onPress={onNavigateHistory}
            >
              <BookOpenText size={18} color={colors.spiritual} weight="bold" />
              <Text style={[styles.navButtonText, { color: colors.text, fontSize: scaleFontSize(15) }]}>
                {t.home.history}
              </Text>
            </TouchableOpacity>
          </View>

          <LanguageMenu />
          <FontSizeMenu />

          <View style={[styles.privacyGroup, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary, fontSize: scaleFontSize(12) }]}>
              {t.menu.privacyPolicy}
            </Text>
            <View style={[styles.privacyCard, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
              <Text style={[styles.privacyText, { color: colors.text, fontSize: scaleFontSize(13), lineHeight: scaleFontSize(13) * 1.45 }]}>
                {t.menu.privacySummary}
              </Text>
              <Text style={[styles.privacyContact, { color: colors.spiritual, fontSize: scaleFontSize(12) }]}>
                {t.menu.privacyContact}
              </Text>
            </View>
          </View>
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
  privacyGroup: {
    borderBottomWidth: 1,
    padding: 16,
    gap: 10,
  },
  privacyCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  privacyText: {
    fontSize: 13,
  },
  privacyContact: {
    fontSize: 12,
    fontWeight: '600',
  },
});
