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
import { BhaktamarData, Verse } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useFontSize } from "../contexts/FontSizeContext";

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
                styles.iconButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={onOpenDrawer}
            >
              <List size={24} color={colors.spiritual} weight="bold" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
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
              style={[styles.button, { backgroundColor: colors.button }]}
              onPress={handleStartReading}
            >
              <Text
                style={[
                  styles.primaryButtonText,
                  { color: colors.buttonText, fontSize: scaleFontSize(18) },
                ]}
              >
                {t.home.startReading}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.secondaryButton,
                { borderColor: colors.spiritual },
              ]}
              onPress={handleBrowseVerses}
            >
              <Text
                style={[
                  styles.secondaryButtonText,
                  { color: colors.spiritual, fontSize: scaleFontSize(18) },
                ]}
              >
                {t.home.browseVerses}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
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
                  styles.samputButtonText,
                  { color: colors.spiritual, fontSize: scaleFontSize(18) },
                ]}
              >
                {t.home.samputReading}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.historyButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={handleHistory}
            >
              <Text
                style={[
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
    backgroundColor: "#f8f6f0",
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f6f0",
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
  iconButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#E0E0E0",
  },
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#8B4513",
    marginBottom: 12,
    textAlign: "center",
  },
  verseCard: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verseNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B4513",
    marginBottom: 8,
    textAlign: "center",
  },
  sanskritText: {
    fontSize: 16,
    color: "#2F4F4F",
    lineHeight: 24,
    marginBottom: 12,
    fontFamily: "serif",
  },
  transliterationText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  hindiText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
    lineHeight: 20,
  },
  englishText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#8B4513",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#8B4513",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#8B4513",
    fontSize: 18,
    fontWeight: "bold",
  },
  samputButton: {
    backgroundColor: "#F5DEB3",
    borderWidth: 2,
    borderColor: "#8B4513",
  },
  samputButtonText: {
    color: "#8B4513",
    fontSize: 18,
    fontWeight: "bold",
  },
  historyButton: {
    borderWidth: 1,
  },
  historyButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
