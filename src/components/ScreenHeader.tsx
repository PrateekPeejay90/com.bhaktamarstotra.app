import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { List } from 'phosphor-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { BackIconButton } from './BackIconButton';

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
  onOpenDrawer: () => void;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
  titleFontSize?: number;
  subtitleFontSize?: number;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  onOpenDrawer,
  subtitle,
  titleColor,
  subtitleColor,
  titleFontSize = 18,
  subtitleFontSize = 12,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      <View style={styles.sideSlot}>
        <BackIconButton onPress={onBack} />
      </View>

      <View style={styles.centerContent}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            { color: titleColor ?? colors.spiritual, fontSize: titleFontSize },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            style={[
              styles.subtitle,
              { color: subtitleColor ?? colors.textSecondary, fontSize: subtitleFontSize },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={[styles.sideSlot, styles.sideSlotRight]}>
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={onOpenDrawer}
        >
          <List size={20} color={colors.spiritual} weight="bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  sideSlot: {
    width: 42,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sideSlotRight: {
    alignItems: 'flex-end',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 2,
    textAlign: 'center',
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    height: 42,
    width: 42,
  },
});
