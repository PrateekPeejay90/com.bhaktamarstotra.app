import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Linking,
} from "react-native";
import { ArrowSquareOut, BookOpenText, House, X } from "phosphor-react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useFontSize } from "../contexts/FontSizeContext";
import { PRIVACY_POLICY_URL } from "../constants/appInfo";
import { componentRecipes } from "../styles/componentRecipes";
import { FontSizeMenu } from "./FontSizeMenu";
import { LanguageMenu } from "./LanguageMenu";

interface MenuDrawerProps {
  visible: boolean;
  activeScreen:
    | "home"
    | "verseList"
    | "verseDetail"
    | "samputSelection"
    | "samputReading"
    | "search"
    | "history";
  onClose: () => void;
  onNavigateHome: () => void;
  onNavigateHistory: () => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
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

  const handleOpenPrivacyPolicy = async () => {
    onClose();

    try {
      await Linking.openURL(PRIVACY_POLICY_URL);
    } catch (error) {
      console.warn("Unable to open privacy policy URL", error);
    }
  };

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
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        style={[
          styles.drawer,
          componentRecipes.drawerPanel,
          {
            backgroundColor: colors.surface,
            borderRightColor: colors.border,
            transform: [{ translateX: slideAnim }],
            width: DRAWER_WIDTH,
          },
        ]}
      >
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View></View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.text} weight="bold" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View
            style={[
              componentRecipes.drawerSection,
              styles.navigationGroup,
              { borderBottomColor: colors.border },
            ]}
          >
            <Text
              style={[
                componentRecipes.drawerSectionTitle,
                styles.sectionTitle,
                { color: colors.textSecondary, fontSize: scaleFontSize(12) },
              ]}
            >
              {t.menu.navigate}
            </Text>

            <TouchableOpacity
              style={[componentRecipes.drawerRowButton, styles.navButton]}
              onPress={onNavigateHome}
            >
              <House size={18} color={colors.spiritual} weight="bold" />
              <Text
                style={[
                  styles.navButtonText,
                  { color: colors.text, fontSize: scaleFontSize(15) },
                ]}
              >
                {t.navigation.home}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[componentRecipes.drawerRowButton, styles.navButton]}
              onPress={onNavigateHistory}
            >
              <BookOpenText size={18} color={colors.spiritual} weight="bold" />
              <Text
                style={[
                  styles.navButtonText,
                  { color: colors.text, fontSize: scaleFontSize(15) },
                ]}
              >
                {t.home.history}
              </Text>
            </TouchableOpacity>
          </View>

          <LanguageMenu />
          <FontSizeMenu />

          <View
            style={[
              componentRecipes.drawerSection,
              styles.privacyGroup,
              { borderBottomColor: colors.border },
            ]}
          >
            <TouchableOpacity
              style={[componentRecipes.drawerSplitRowButton, styles.privacyLinkButton]}
              onPress={handleOpenPrivacyPolicy}
            >
              <Text
                style={[
                  styles.privacyLinkText,
                  { color: colors.text, fontSize: scaleFontSize(15) },
                ]}
              >
                {t.menu.privacyPolicy}
              </Text>
              <ArrowSquareOut
                size={18}
                color={colors.spiritual}
                weight="bold"
              />
            </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRightWidth: 1,
    zIndex: 1000,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 56,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
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
    gap: 10,
  },
  sectionTitle: {},
  navButton: {},
  navButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  privacyGroup: {
    gap: 8,
  },
  privacyLinkButton: {},
  privacyLinkText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
