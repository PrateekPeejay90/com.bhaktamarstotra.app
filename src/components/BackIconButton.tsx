import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface BackIconButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: 'surface' | 'surfaceVariant';
}

export const BackIconButton: React.FC<BackIconButtonProps> = ({
  onPress,
  style,
  variant = 'surface',
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      accessibilityLabel="Go back"
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: variant === 'surfaceVariant' ? colors.surfaceVariant : colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <ArrowLeft size={20} color={colors.spiritual} weight="bold" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
});
