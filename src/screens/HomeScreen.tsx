import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { dataService } from '../services/dataService';
import { BhaktamarData, Verse } from '../types';

interface HomeScreenProps {
  onStartReading: () => void;
  onBrowseVerses: () => void;
  onSamputt: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartReading, onBrowseVerses, onSamputt }) => {
  const [appData, setAppData] = useState<BhaktamarData | null>(null);

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

  if (!appData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Bhaktamar Stotra...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Main Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{appData.title}</Text>
          <Text style={styles.subtitle}>भक्तामर स्तोत्र</Text>
          <Text style={styles.author}>by {appData.author}</Text>
        </View>

        {/* App Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{dataService.getTotalVerses()}</Text>
            <Text style={styles.statLabel}>Verses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{appData.total_pages}</Text>
            <Text style={styles.statLabel}>Pages</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={handleStartReading}
          >
            <Text style={styles.primaryButtonText}>Start Reading</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={handleBrowseVerses}
          >
            <Text style={styles.secondaryButtonText}>Browse All Verses</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.samputButton]}
            onPress={handleSamputt}
          >
            <Text style={styles.samputButtonText}>🕉️ Samputt Reading</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f0',
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f6f0',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 48,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#CD853F',
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#CD853F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 12,
    textAlign: 'center',
  },
  verseCard: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verseNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 8,
    textAlign: 'center',
  },
  sanskritText: {
    fontSize: 16,
    color: '#2F4F4F',
    lineHeight: 24,
    marginBottom: 12,
    fontFamily: 'serif',
  },
  transliterationText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  hindiText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    lineHeight: 20,
  },
  englishText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#8B4513',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#8B4513',
    fontSize: 18,
    fontWeight: 'bold',
  },
  samputButton: {
    backgroundColor: '#F5DEB3',
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  samputButtonText: {
    color: '#8B4513',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
