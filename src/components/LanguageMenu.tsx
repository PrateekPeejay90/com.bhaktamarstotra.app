import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Globe, CaretDown, CaretUp, Check } from 'phosphor-react-native';
import { useLanguage, LanguageCode } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useFontSize } from '../contexts/FontSizeContext';

export const LanguageMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { colors } = useTheme();
  const { scaleFontSize } = useFontSize();

  const languages: { code: LanguageCode; label: string; nativeLabel: string }[] = [
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      {/* Header - Collapsible */}
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Globe size={20} color={colors.spiritual} weight="bold" />
          <Text style={[styles.title, { color: colors.spiritual, fontSize: scaleFontSize(16) }]}>{t.menu.language}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.currentLanguage, { color: colors.textSecondary, fontSize: scaleFontSize(14) }]}>
            {currentLanguage?.nativeLabel}
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
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                { backgroundColor: colors.surface, borderColor: colors.border },
                language === lang.code && { backgroundColor: colors.accent, borderColor: colors.spiritual }
              ]}
              onPress={() => setLanguage(lang.code)}
            >
              <View style={styles.languageInfo}>
                <Text
                  style={[
                    styles.languageLabel,
                    { color: language === lang.code ? colors.spiritual : colors.text, fontSize: scaleFontSize(16) }
                  ]}
                >
                  {lang.nativeLabel}
                </Text>
                <Text
                  style={[
                    styles.languageSubLabel,
                    { color: language === lang.code ? colors.spiritual : colors.textSecondary, fontSize: scaleFontSize(12) }
                  ]}
                >
                  {lang.label}
                </Text>
              </View>
              {language === lang.code && (
                <Check size={20} color={colors.spiritual} weight="bold" />
              )}
            </TouchableOpacity>
          ))}
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
  currentLanguage: {
    fontSize: 14,
    fontWeight: '500',
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
  },
  languageInfo: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  languageSubLabel: {
    fontSize: 12,
    fontWeight: '400',
  },
});
