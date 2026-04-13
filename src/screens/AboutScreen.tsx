import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { List } from 'phosphor-react-native';
import { Divider, Surface } from 'react-native-paper';
import { dataService } from '../services/dataService';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  APP_NAME,
  APP_PACKAGE_ID,
  APP_VERSION,
  getPrivacyPolicyUrl,
  hasPublicPrivacyPolicyUrl,
} from '../constants/appInfo';

interface AboutScreenProps {
  onBack: () => void;
  onOpenDrawer: () => void;
}

const InfoRow: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
};

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack, onOpenDrawer }) => {
  const { colors, roundness } = useTheme();
  const { t } = useLanguage();
  const appInfo = dataService.getAppInfo();
  const privacyPolicyUrl = getPrivacyPolicyUrl();
  const canOpenPolicy = hasPublicPrivacyPolicyUrl();

  const handleOpenPolicy = async () => {
    if (!canOpenPolicy) {
      return;
    }

    await Linking.openURL(privacyPolicyUrl);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
          onPress={onBack}
        >
          <Text style={[styles.backButtonText, { color: colors.spiritual }]}>{t.navigation.back}</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.spiritual }]}>{t.about.title}</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>{t.about.subtitle}</Text>
        </View>

        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
          onPress={onOpenDrawer}
        >
          <List size={20} color={colors.spiritual} weight="bold" />
        </TouchableOpacity>
      </View>

      <Surface style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: roundness }]}>
        <Text style={[styles.sectionTitle, { color: colors.spiritual }]}>{t.about.appInfo}</Text>
        <InfoRow label={t.about.version} value={APP_VERSION} />
        <InfoRow label={t.about.packageId} value={APP_PACKAGE_ID} />
        <InfoRow label={t.about.author} value={appInfo.author} />
        <InfoRow label={t.about.totalVerses} value={String(dataService.getTotalVerses())} />
        <InfoRow label={t.about.title} value={APP_NAME} />
      </Surface>

      <Surface style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: roundness }]}>
        <Text style={[styles.sectionTitle, { color: colors.spiritual }]}>{t.about.privacyTitle}</Text>
        <Text style={[styles.bodyText, { color: colors.text }]}>{t.about.localOnly}</Text>
        <Text style={[styles.bodyText, { color: colors.text }]}>{t.about.dataStored}</Text>
        <Text style={[styles.bodyText, { color: colors.text }]}>{t.about.noTracking}</Text>

        <Divider style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{t.about.privacyPolicy}</Text>
        <Text style={[styles.linkText, { color: canOpenPolicy ? colors.primary : colors.textSecondary }]}>
          {privacyPolicyUrl}
        </Text>

        <TouchableOpacity
          style={[
            styles.linkButton,
            {
              backgroundColor: canOpenPolicy ? colors.button : colors.surfaceVariant,
              borderColor: colors.border,
            },
          ]}
          onPress={handleOpenPolicy}
          disabled={!canOpenPolicy}
        >
          <Text
            style={[
              styles.linkButtonText,
              { color: canOpenPolicy ? colors.buttonText : colors.textSecondary },
            ]}
          >
            {canOpenPolicy ? t.about.openPolicy : t.about.hostingHint}
          </Text>
        </TouchableOpacity>
      </Surface>

      <Surface style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: roundness }]}>
        <Text style={[styles.sectionTitle, { color: colors.spiritual }]}>{t.about.complianceTitle}</Text>
        <Text style={[styles.bodyText, { color: colors.text }]}>{t.about.playStoreReady}</Text>
        <Text style={[styles.caption, { color: colors.textSecondary }]}>
          {t.about.releaseNote}
        </Text>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    borderBottomWidth: 1,
  },
  backButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 1,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  menuButton: {
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    padding: 18,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 14,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
  },
  divider: {
    marginVertical: 14,
  },
  linkText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  linkButton: {
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  linkButtonText: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  caption: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
});
