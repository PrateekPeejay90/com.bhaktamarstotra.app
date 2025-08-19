import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ScrollView
} from 'react-native';
import { dataService } from '../services/dataService';

interface SamputSelectionScreenProps {
  onBack: () => void;
  onStartSamputt: (selectedVerseNumber: number) => void;
}

export const SamputSelectionScreen: React.FC<SamputSelectionScreenProps> = ({
  onBack,
  onStartSamputt
}) => {
  const [selectedVerse, setSelectedVerse] = useState<string>('');
  const totalVerses = dataService.getTotalVerses();

  const handleVerseSelection = (verseNumber: string) => {
    setSelectedVerse(verseNumber);
  };

  const handleStartSamputt = () => {
    const verseNumber = parseInt(selectedVerse);
    
    if (!selectedVerse || isNaN(verseNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid verse number.');
      return;
    }
    
    if (verseNumber < 1 || verseNumber > totalVerses) {
      Alert.alert(
        'Invalid Range', 
        `Please enter a verse number between 1 and ${totalVerses}.`
      );
      return;
    }

    onStartSamputt(verseNumber);
  };

  const renderQuickSelectButtons = () => {
    const popularVerses = [1, 20, 25, 30, 48]; // Popular verses for Samputt
    
    return (
      <View style={styles.quickSelectContainer}>
        <Text style={styles.quickSelectLabel}>Quick Select:</Text>
        <View style={styles.quickSelectButtons}>
          {popularVerses.map((verse) => (
            <TouchableOpacity
              key={verse}
              style={[
                styles.quickSelectButton,
                selectedVerse === verse.toString() && styles.selectedQuickButton
              ]}
              onPress={() => handleVerseSelection(verse.toString())}
            >
              <Text style={[
                styles.quickSelectButtonText,
                selectedVerse === verse.toString() && styles.selectedQuickButtonText
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Samputt Reading</Text>
        </View>

        {/* Explanation */}
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>🕉️ What is Samputt?</Text>
          <Text style={styles.explanationText}>
            Samputt is a spiritual practice where a selected verse is repeated between each verse of the Bhaktamar Stotra. 
            This creates a rhythmic pattern that enhances meditation and devotion.
          </Text>
          
          <Text style={styles.exampleTitle}>Example Pattern:</Text>
          <Text style={styles.exampleText}>
            If you select verse 20:{'\n'}
            Verse 1 → Verse 20 → Verse 2 → Verse 20 → Verse 3 → Verse 20...
          </Text>
        </View>

        {/* Verse Selection */}
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionTitle}>Select Verse for Samputt</Text>
          <Text style={styles.selectionSubtitle}>
            Choose a verse number (1 to {totalVerses})
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.verseInput}
              value={selectedVerse}
              onChangeText={handleVerseSelection}
              placeholder="Enter verse number"
              placeholderTextColor="#999999"
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          {renderQuickSelectButtons()}
        </View>

        {/* Preview */}
        {selectedVerse && !isNaN(parseInt(selectedVerse)) && 
         parseInt(selectedVerse) >= 1 && parseInt(selectedVerse) <= totalVerses && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Selected Verse Preview:</Text>
            <View style={styles.previewCard}>
              <Text style={styles.previewVerseNumber}>Verse {selectedVerse}</Text>
              <Text style={styles.previewContent}>
                {dataService.getVerseByNumber(parseInt(selectedVerse))?.content.split('\n')[0]}...
              </Text>
            </View>
          </View>
        )}

        {/* Start Button */}
        <TouchableOpacity
          style={[
            styles.startButton,
            !selectedVerse && styles.disabledButton
          ]}
          onPress={handleStartSamputt}
          disabled={!selectedVerse}
        >
          <Text style={[
            styles.startButtonText,
            !selectedVerse && styles.disabledButtonText
          ]}>
            Start Samputt Reading
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginLeft: 16,
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
  },
  verseInput: {
    borderWidth: 2,
    borderColor: '#8B4513',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    minWidth: 100,
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
