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
import { componentRecipes } from "../styles/componentRecipes";

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
      style={[styles.verseItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
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
            componentRecipes.surfaceTextInput,
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
              componentRecipes.inlineActionButton,
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
  },
  searchContainer: {
    padding: 16,
    gap: 10,
  },
  searchInput: {},
  directVerseButton: {},
  directVerseButtonText: {
    fontWeight: "700",
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  verseItem: {
    ...componentRecipes.listRowCard,
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
  },
  sanskritPreview: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    fontFamily: "serif",
  },
});
