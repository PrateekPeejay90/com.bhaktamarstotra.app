import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFontSize, FontSizeLevel } from '../contexts/FontSizeContext';

interface FontSizeControlsProps {
  style?: any;
}

export const FontSizeControls: React.FC<FontSizeControlsProps> = ({ style }) => {
  const { currentLevel, increaseFontSize, decreaseFontSize, setFontSizeLevel } = useFontSize();

  const fontSizeLevels: { level: FontSizeLevel; label: string }[] = [
    { level: 'small', label: 'A' },
    { level: 'medium', label: 'A' },
    { level: 'large', label: 'A' },
    { level: 'extra-large', label: 'A' },
  ];

  const canDecrease = currentLevel !== 'small';
  const canIncrease = currentLevel !== 'extra-large';

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>Font Size</Text>
      
      <View style={styles.controlsRow}>
        {/* Decrease Button */}
        <TouchableOpacity
          style={[styles.button, !canDecrease && styles.disabledButton]}
          onPress={decreaseFontSize}
          disabled={!canDecrease}
        >
          <Text style={[styles.buttonText, !canDecrease && styles.disabledButtonText]}>
            A-
          </Text>
        </TouchableOpacity>

        {/* Font Size Level Indicators */}
        <View style={styles.levelIndicators}>
          {fontSizeLevels.map((item, index) => (
            <TouchableOpacity
              key={item.level}
              style={[
                styles.levelButton,
                currentLevel === item.level && styles.activeLevelButton
              ]}
              onPress={() => setFontSizeLevel(item.level)}
            >
              <Text
                style={[
                  styles.levelText,
                  { fontSize: 12 + (index * 2) }, // Progressive size increase
                  currentLevel === item.level && styles.activeLevelText
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Increase Button */}
        <TouchableOpacity
          style={[styles.button, !canIncrease && styles.disabledButton]}
          onPress={increaseFontSize}
          disabled={!canIncrease}
        >
          <Text style={[styles.buttonText, !canIncrease && styles.disabledButtonText]}>
            A+
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.currentLevelText}>
        Current: {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1).replace('-', ' ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 50,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#999999',
  },
  levelIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    minWidth: 35,
    alignItems: 'center',
  },
  activeLevelButton: {
    backgroundColor: '#F5DEB3',
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  levelText: {
    color: '#666666',
    fontWeight: '600',
  },
  activeLevelText: {
    color: '#8B4513',
  },
  currentLevelText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 4,
  },
});
