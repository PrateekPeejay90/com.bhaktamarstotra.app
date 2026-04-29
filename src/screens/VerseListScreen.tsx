import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { ArrowRight } from "phosphor-react-native";
import { dataService } from "../services/dataService";
import { searchService } from "../services/searchService";
import { Verse } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useFontSize } from "../contexts/FontSizeContext";
import { ScreenHeader } from "../components/ScreenHeader";

interface VerseListScreenProps {
  onVerseSelect: (verse: Verse) => void;
  onBack: () => void;
  onOpenDrawer: () => void;
}

export const VerseListScreen: React.FC<VerseListScreenProps> = ({
  onVerseSelect,
  onBack,
  onOpenDrawer,
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { fontSizes, scaleFontSize } = useFontSize();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [filteredVerses, setFilteredVerses] = useState<Verse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const directVerseMatch = searchQuery
    .trim()
    .match(/^(?:verse|shlok|श्लोक)?\s*(\d{1,2})$/i);
  const directVerseNumber = directVerseMatch
    ? Number(directVerseMatch[1])
    : null;
  const directVerse = directVerseNumber
    ? dataService.getVerseByNumber(directVerseNumber)
    : undefined;

  useEffect(() => {
    const allVerses = dataService.getAllVerses();
    setVerses(allVerses);
    setFilteredVerses(allVerses);
  }, []);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === "") {
      setFilteredVerses(verses);
    } else if (directVerseNumber !== null) {
      setFilteredVerses(directVerse ? [directVerse] : []);
    } else {
      const results = searchService.searchVerses(trimmedQuery);
      setFilteredVerses(results.map((result) => result.verse));
    }
  }, [directVerse, directVerseNumber, searchQuery, verses]);

  const handleSearchSubmit = () => {
    if (directVerse) {
      onVerseSelect(directVerse);
    }
  };

  const renderVerseItem = ({ item }: { item: Verse }) => (
    <TouchableOpacity
      style={[styles.verseItem, { backgroundColor: colors.surface }]}
      onPress={() => onVerseSelect(item)}
    >
      <View style={styles.verseHeader}>
        <Text
          style={[
            styles.verseNumber,
            { color: colors.spiritual, fontSize: fontSizes.labels },
          ]}
        >
          {t.verseDetail.verse} {item.verse_number}
        </Text>
      </View>

      <Text
        style={[
          styles.sanskritPreview,
          {
            color: colors.text,
            fontSize: fontSizes.sanskrit,
            lineHeight: fontSizes.sanskrit * 1.5,
          },
        ]}
        numberOfLines={2}
      >
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeader
        title={t.verseList.title}
        onBack={onBack}
        onOpenDrawer={onOpenDrawer}
        titleFontSize={scaleFontSize(18)}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
              fontSize: scaleFontSize(16),
            },
          ]}
          placeholder={t.verseList.searchPlaceholder}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType={directVerse ? "go" : "search"}
        />
        {directVerse ? (
          <TouchableOpacity
            style={[
              styles.directVerseButton,
              { backgroundColor: colors.spiritual },
            ]}
            onPress={() => onVerseSelect(directVerse)}
          >
            <Text
              style={[
                styles.directVerseButtonText,
                { color: colors.buttonText, fontSize: scaleFontSize(15) },
              ]}
            >
              {t.verseList.goToVerse} {directVerse.verse_number}
            </Text>
            <ArrowRight size={18} color={colors.buttonText} weight="bold" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Verse List */}
      <FlatList
        data={filteredVerses}
        renderItem={renderVerseItem}
        keyExtractor={(item) => `verse-${item.verse_number}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f6f0",
  },
  searchContainer: {
    padding: 16,
    gap: 10,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  directVerseButton: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  directVerseButtonText: {
    fontWeight: "700",
  },
  resultsCount: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 14,
    color: "#666666",
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  verseItem: {
    backgroundColor: "#ffffff",
    // borderRadius: 12,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    padding: 8,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  verseNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8B4513",
  },
  pageNumber: {
    fontSize: 12,
    color: "#999999",
  },
  sanskritPreview: {
    fontSize: 16,
    color: "#2F4F4F",
    lineHeight: 24,
    marginBottom: 8,
    fontFamily: "serif",
  },
  transliterationPreview: {
    fontSize: 14,
    color: "#696969",
    fontStyle: "italic",
    marginBottom: 8,
  },
  meaningPreview: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
  },
});
