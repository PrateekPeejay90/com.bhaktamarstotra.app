import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { List, MagnifyingGlass } from "phosphor-react-native";
import { dataService } from "../services/dataService";
import { BhaktamarData } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useFontSize } from "../contexts/FontSizeContext";
import { componentRecipes } from "../styles/componentRecipes";

interface HomeScreenProps {
  onStartReading: () => void;
  onBrowseVerses: () => void;
  onSamputt: () => void;
  onHistory: () => void;
  onSearch: () => void;
  onOpenDrawer: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartReading,
  onBrowseVerses,
  onSamputt,
  onHistory,
  onSearch,
  onOpenDrawer,
}) => {
  const [appData, setAppData] = useState<BhaktamarData | null>(null);
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { fontSizes, scaleFontSize } = useFontSize();

  useEffect(() => {
    const data = dataService.getAllData();
    setAppData(data);
  }, []);

  const handleStartReading = () => {
    onStartReading();
  };

  const handleBrowseVerses = () => {
    onBrowseVerses();
  };

  const handleSamputt = () => {
    onSamputt();
  };

  const handleSearch = () => {
    onSearch();
  };

  const handleHistory = () => {
    onHistory();
  };

  if (!appData) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <Text
          style={[
            styles.loadingText,
            { color: colors.text, fontSize: scaleFontSize(16) },
          ]}
        >
          {t.home.loading}
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.content}>
          {/* Header Controls */}
          <View style={styles.headerControls}>
            <TouchableOpacity
              style={[
                componentRecipes.compactOutlineIconButton,
                styles.iconButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={onOpenDrawer}
            >
              <List size={24} color={colors.spiritual} weight="bold" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                componentRecipes.compactOutlineIconButton,
                styles.iconButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={handleSearch}
            >
              <MagnifyingGlass
                size={24}
                color={colors.spiritual}
                weight="bold"
              />
            </TouchableOpacity>
          </View>

          {/* Main Title */}
          <View style={styles.titleSection}>
            <Image
              source={require("../../assets/home-logo.png")}
              style={styles.homeLogo}
              resizeMode="contain"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                componentRecipes.actionButton,
                styles.button,
                { backgroundColor: colors.button },
              ]}
              onPress={handleStartReading}
            >
              <Text
                style={[
                  componentRecipes.buttonLabelBold,
                  styles.primaryButtonText,
                  { color: colors.buttonText, fontSize: scaleFontSize(18) },
                ]}
              >
                {t.home.startReading}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                componentRecipes.actionButton,
                styles.button,
                styles.secondaryButton,
                { borderColor: colors.spiritual },
              ]}
              onPress={handleBrowseVerses}
            >
              <Text
                style={[
                  componentRecipes.buttonLabelBold,
                  styles.secondaryButtonText,
                  { color: colors.spiritual, fontSize: scaleFontSize(18) },
                ]}
              >
                {t.home.browseVerses}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                componentRecipes.actionButton,
                styles.button,
                styles.samputButton,
                {
                  backgroundColor: colors.accent,
                  borderColor: colors.spiritual,
                },
              ]}
              onPress={handleSamputt}
            >
              <Text
                style={[
                  componentRecipes.buttonLabelBold,
                  styles.samputButtonText,
                  { color: colors.spiritual, fontSize: scaleFontSize(18) },
                ]}
              >
                {t.home.samputReading}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                componentRecipes.actionButton,
                styles.button,
                styles.historyButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={handleHistory}
            >
              <Text
                style={[
                  componentRecipes.buttonLabelSemibold,
                  styles.historyButtonText,
                  { color: colors.text, fontSize: scaleFontSize(18) },
                ]}
              >
                {t.home.history}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  headerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconButton: {},
  titleSection: {
    alignItems: "center",
    marginBottom: 48,
    paddingVertical: 28,
  },
  homeLogo: {
    width: 156,
    height: 184,
    marginBottom: 18,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {},
  secondaryButton: {
    backgroundColor: "transparent",
    ...componentRecipes.outlineActionButton,
  },
  primaryButtonText: {},
  secondaryButtonText: {},
  samputButton: {
    ...componentRecipes.outlineActionButton,
  },
  samputButtonText: {},
  historyButton: {
    ...componentRecipes.subtleActionButton,
  },
  historyButtonText: {},
});
