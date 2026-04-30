import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { useFontSize } from '../contexts/FontSizeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface HistoryScreenProps {
  onBack: () => void;
  onOpenDrawer: () => void;
}

const HISTORY_PARAGRAPHS = [
  `Jainism or Jain Dharma is an antiquated religion. Devotees of Jainism are designated as "Jains," a word got from the Sanskrit word jina (victor) and importance the way of triumph in traversing life's flood of resurrections through a moral and profound life. Jains follow their history through a progression of twenty-four successful heros and instructors known as tirthankaras, with the first being Ruler Adinath, who is otherwise called Rishabha Dev, who, as indicated by Jain custom, lived a large number of years back, twenty-third being Parshvanatha in the 8th century BC and twenty-fourth being the Mahavira around 500 BCE (around two thousand five hundred years prior). Jains trust that Jainism is an everlasting dharma, with the tirthankaras managing each cycle of the Jain cosmology. Jain Dharma trusts that the Ratantraya, or the three gems (right faith, right knowledge, and right conduct), can indicate your way of freedom.`,
  `Also, Bhaktamar strotra, which is created by Acharya Mantunga, is an impressive voyage from first word "Bhakta" and final word "Lakshmi." In this stotra, Acharya Mantunga has portrayed this adventure in 48 most dominant sections. The time you begin presenting the primary word "Bhakta," you are engaged with a persona portrayal about the intensity of All-powerful. When you close with the final word "Lakshmi," an unequivocal positive progression of vitality goes through your entire body. This vitality gives us mental harmony, physical wellness, and budgetary soundness, as well as societal position. This stotra has been passed down from ages to ages. Also, it is trusted that its significance and adequacy have expanded after some time. We should take out this voyage routinely and appreciate it. Bhaktamar is created so keenly by Acharya Mantung, with the end goal that each word utilized in the strotra consolidates a few diverse beejakshars. Each Beejakshar, when discussed with dedication, at a specific time, space, creates certain vibrations of their own which convey imperceptible powers inside themselves. At the point when spoken, they produce certain adjustments in the inner and outside condition of the living being. Results can shift from physical wellness to mental headways. One must recite these stotras and experience for themselves the harmony, joy and thriving which they will achieve throughout everyday life.`,
];

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onBack,
  onOpenDrawer,
}) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { scaleFontSize } = useFontSize();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={t.history.title}
        subtitle={t.history.subtitle}
        onBack={onBack}
        onOpenDrawer={onOpenDrawer}
        titleFontSize={scaleFontSize(16)}
        subtitleFontSize={scaleFontSize(12)}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.headingCard,
            {
              backgroundColor: colors.accent,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.headingText,
              {
                color: colors.spiritual,
                fontSize: scaleFontSize(22),
              },
            ]}
          >
            {t.history.heading}
          </Text>
        </View>

        {HISTORY_PARAGRAPHS.map((paragraph, index) => (
          <View
            key={`history-paragraph-${index}`}
            style={[
              styles.contentCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.paragraphText,
                {
                  color: colors.text,
                  fontSize: scaleFontSize(16),
                  lineHeight: scaleFontSize(16) * 1.75,
                },
              ]}
            >
              {paragraph}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
    gap: 16,
  },
  headingCard: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  headingText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  contentCard: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  paragraphText: {
    textAlign: 'justify',
  },
});
