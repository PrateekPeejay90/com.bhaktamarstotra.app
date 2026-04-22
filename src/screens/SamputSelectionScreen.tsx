import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { List } from 'phosphor-react-native';
import { dataService } from '../services/dataService';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BackIconButton } from '../components/BackIconButton';

interface SamputSelectionScreenProps {
  onBack: () => void;
  onStartSamputt: (selectedVerseNumber: number) => void;
  onOpenDrawer: () => void;
}

export const SamputSelectionScreen: React.FC<SamputSelectionScreenProps> = ({
  onBack,
  onStartSamputt,
  onOpenDrawer
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [selectedVerse, setSelectedVerse] = useState<string>('');
  const totalVerses = dataService.getTotalVerses();

  const handleVerseSelection = (verseNumber: string) => {
    setSelectedVerse(verseNumber);
  };

  const handleStartSamputt = () => {
    const verseNumber = parseInt(selectedVerse);
    
    if (!selectedVerse || isNaN(verseNumber)) {
      Alert.alert(t.samputt.invalidNumber, t.samputt.pleaseSelect);
      return;
    }
    
    if (verseNumber < 1 || verseNumber > totalVerses) {
      Alert.alert(
        t.samputt.invalidNumber, 
        t.samputt.pleaseSelect
      );
      return;
    }

    onStartSamputt(verseNumber);
  };

  const renderQuickSelectButtons = () => {
    const popularVerses = [1, 20, 25, 30, 48]; // Popular verses for Samputt
    
    return (
      <View style={styles.quickSelectContainer}>
        <Text style={[styles.quickSelectLabel, { color: colors.text }]}>{t.samputt.quickSelect}:</Text>
        <View style={styles.quickSelectButtons}>
          {popularVerses.map((verse) => (
            <TouchableOpacity
              key={verse}
              style={[
                styles.quickSelectButton,
                { backgroundColor: selectedVerse === verse.toString() ? colors.spiritual : colors.surface, borderColor: colors.border },
                selectedVerse === verse.toString() && { backgroundColor: colors.spiritual }
              ]}
              onPress={() => handleVerseSelection(verse.toString())}
            >
              <Text style={[
                styles.quickSelectButtonText,
                { color: selectedVerse === verse.toString() ? colors.buttonText : colors.textSecondary },
                selectedVerse === verse.toString() && { color: colors.buttonText }
              ]}>
                {verse}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <BackIconButton onPress={onBack} />
          <Text style={[styles.headerTitle, { color: colors.spiritual }]}>{t.samputt.title}</Text>
          <TouchableOpacity 
            style={[styles.menuButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={onOpenDrawer}
          >
            <List size={20} color={colors.spiritual} weight="bold" />
          </TouchableOpacity>
        </View>

        {/* Explanation */}
        <View style={[styles.explanationContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.explanationTitle, { color: colors.spiritual }]}>{t.samputt.whatIs}</Text>
          <Text style={[styles.explanationText, { color: colors.text }]}>
            {t.samputt.description}
          </Text>
          
          <Text style={[styles.exampleTitle, { color: colors.spiritual }]}>Example Pattern:</Text>
          <Text style={[styles.exampleText, { color: colors.textSecondary }]}>
            Select verse 20 → Pattern: 1→20→2→20→3→20...→48→20
          </Text>
        </View>

        {/* Verse Selection */}
        <View style={[styles.selectionContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.selectionTitle, { color: colors.spiritual }]}>{t.samputt.selectVerse}</Text>
          <Text style={[styles.selectionSubtitle, { color: colors.textSecondary }]}>
            Choose a verse number (1 to {totalVerses})
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.verseInput, { backgroundColor: colors.accent, borderColor: colors.spiritual, color: colors.spiritual }]}
              value={selectedVerse}
              onChangeText={handleVerseSelection}
              placeholder={t.samputt.enterNumber}
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          {renderQuickSelectButtons()}
        </View>

        {/* Preview */}
        {selectedVerse && !isNaN(parseInt(selectedVerse)) && 
         parseInt(selectedVerse) >= 1 && parseInt(selectedVerse) <= totalVerses && (
          <View style={[styles.previewContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.previewTitle, { color: colors.spiritual }]}>Selected Verse Preview:</Text>
            <View style={[styles.previewCard, { backgroundColor: colors.accent, borderLeftColor: colors.spiritual }]}>
              <Text style={[styles.previewVerseNumber, { color: colors.spiritual }]}>Verse {selectedVerse}</Text>
              <Text style={[styles.previewContent, { color: colors.text }]}>
                {dataService.getVerseByNumber(parseInt(selectedVerse))?.content.split('\n')[0]}...
              </Text>
            </View>
          </View>
        )}

        {/* Start Button */}
        <TouchableOpacity
          style={[
            styles.startButton,
            { backgroundColor: selectedVerse ? colors.spiritual : colors.surface, borderColor: colors.border },
            !selectedVerse && styles.disabledButton
          ]}
          onPress={handleStartSamputt}
          disabled={!selectedVerse}
        >
          <Text style={[
            styles.startButtonText,
            { color: selectedVerse ? colors.buttonText : colors.textSecondary },
            !selectedVerse && styles.disabledButtonText
          ]}>
            {t.samputt.start}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f0',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  explanationContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 16,
    color: '#444444',
    lineHeight: 24,
    marginBottom: 16,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  selectionContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  selectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  verseInput: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#8B4513',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
    textAlign: 'center',
    minHeight: 52,
    backgroundColor: '#F5DEB3',
  },
  quickSelectContainer: {
    alignItems: 'center',
  },
  quickSelectLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
  },
  quickSelectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  quickSelectButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  selectedQuickButton: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  quickSelectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
  },
  selectedQuickButtonText: {
    color: '#ffffff',
  },
  previewContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
  },
  previewCard: {
    backgroundColor: '#F5DEB3',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513',
  },
  previewVerseNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  previewContent: {
    fontSize: 16,
    color: '#2F4F4F',
    fontFamily: 'serif',
  },
  startButton: {
    backgroundColor: '#8B4513',
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#999999',
  },
});
