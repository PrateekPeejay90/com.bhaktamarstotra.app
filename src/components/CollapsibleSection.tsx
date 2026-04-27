import React, { ReactNode, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CaretDown, CaretUp } from 'phosphor-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  titleFontSize: number;
  defaultExpanded?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  titleFontSize,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { colors } = useTheme();
  const Icon = expanded ? CaretUp : CaretDown;

  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded((current) => !current)}
        style={[styles.header, { borderBottomColor: expanded ? colors.border : 'transparent' }]}
      >
        <Text style={[styles.title, { color: colors.spiritual, fontSize: titleFontSize }]}>
          {title}
        </Text>
        <Icon size={20} color={colors.spiritual} weight="bold" />
      </TouchableOpacity>

      {expanded ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderRadius: 12,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
});
