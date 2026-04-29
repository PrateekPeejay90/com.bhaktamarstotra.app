import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, ArrowRight } from 'phosphor-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { uiPrimitives } from '../styles/uiPrimitives';

interface BottomNavigationBarProps {
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
  buttonFontSize: number;
  centerContent: ReactNode;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  buttonFontSize,
  centerContent,
}) => {
  const { colors } = useTheme();
  const previousNavColor = canGoPrevious ? colors.buttonText : colors.textSecondary;
  const nextNavColor = canGoNext ? colors.buttonText : colors.textSecondary;

  return (
    <View
      style={[
        styles.container,
        uiPrimitives.stickyFooter,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.navButton,
          {
            backgroundColor: canGoPrevious ? colors.spiritual : colors.surface,
            borderColor: colors.border,
          },
          !canGoPrevious && styles.disabledNavButton,
        ]}
        onPress={onPrevious}
        disabled={!canGoPrevious}
      >
        <View style={styles.navButtonContent}>
          <ArrowLeft size={18} color={previousNavColor} weight="bold" />
          <Text
            style={[
              styles.navButtonText,
              { color: previousNavColor, fontSize: buttonFontSize },
              !canGoPrevious && styles.disabledNavButtonText,
            ]}
          >
            {previousLabel}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.progressContainer}>{centerContent}</View>

      <TouchableOpacity
        style={[
          styles.navButton,
          {
            backgroundColor: canGoNext ? colors.spiritual : colors.surface,
            borderColor: colors.border,
          },
          !canGoNext && styles.disabledNavButton,
        ]}
        onPress={onNext}
        disabled={!canGoNext}
      >
        <View style={styles.navButtonContent}>
          <Text
            style={[
              styles.navButtonText,
              { color: nextNavColor, fontSize: buttonFontSize },
              !canGoNext && styles.disabledNavButtonText,
            ]}
          >
            {nextLabel}
          </Text>
          <ArrowRight size={18} color={nextNavColor} weight="bold" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  navButtonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  disabledNavButton: {
    backgroundColor: '#cccccc',
  },
  navButtonText: {
    fontWeight: '600',
  },
  disabledNavButtonText: {
    color: '#999999',
  },
  progressContainer: {
    alignItems: 'center',
  },
});
