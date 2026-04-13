import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextAa, Minus, Plus, CaretDown, CaretUp } from 'phosphor-react-native';
import { useFontSize } from '../contexts/FontSizeContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export const FontSizeMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentLevel, fontSizes, increaseFontSize, decreaseFontSize } = useFontSize();
  const { colors } = useTheme();
  const { t } = useLanguage();

  const canDecrease = currentLevel !== 'small';
  const canIncrease = currentLevel !== 'extra-large';

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      {/* Header - Collapsible */}
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <TextAa size={20} color={colors.spiritual} weight="bold" />
          <Text style={[styles.title, { color: colors.spiritual }]}>{t.menu.fontSize}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.currentLevel, { color: colors.textSecondary }]}>
            {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1).replace('-', ' ')}
          </Text>
          {isExpanded ? (
            <CaretUp size={20} color={colors.spiritual} weight="bold" />
          ) : (
            <CaretDown size={20} color={colors.spiritual} weight="bold" />
          )}
        </View>
      </TouchableOpacity>

      {/* Expandable Content */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          {/* Preview Text */}
          <View style={[styles.previewContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={[styles.previewLabel, { color: colors.textSecondary }]}>{t.menu.preview}</Text>
            <Text style={[styles.previewSanskrit, { color: colors.text, fontSize: fontSizes.sanskrit }]}>
              भक्तामर स्तोत्र
            </Text>
            <Text style={[styles.previewEnglish, { color: colors.text, fontSize: fontSizes.english }]}>
              Bhaktamar Stotra
            </Text>
          </View>

          {/* Size Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
                !canDecrease && styles.disabledButton
              ]}
              onPress={decreaseFontSize}
              disabled={!canDecrease}
            >
              <Minus size={20} color={canDecrease ? colors.spiritual : colors.textSecondary} weight="bold" />
              <Text style={[styles.buttonLabel, { color: canDecrease ? colors.spiritual : colors.textSecondary }]}>{t.menu.smaller}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.controlButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
                !canIncrease && styles.disabledButton
              ]}
              onPress={increaseFontSize}
              disabled={!canIncrease}
            >
              <Plus size={20} color={canIncrease ? colors.spiritual : colors.textSecondary} weight="bold" />
              <Text style={[styles.buttonLabel, { color: canIncrease ? colors.spiritual : colors.textSecondary }]}>{t.menu.larger}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentLevel: {
    fontSize: 14,
    fontWeight: '500',
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  previewContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '500',
  },
  previewSanskrit: {
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  previewEnglish: {
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledButton: {
    opacity: 0.4,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});
