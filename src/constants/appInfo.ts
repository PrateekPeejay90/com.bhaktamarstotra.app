import { Platform } from 'react-native';
import packageJson from '../../package.json';

export const APP_NAME = 'Bhaktamar Stotra';
export const APP_REGISTRY_NAME = 'BhaktamarStotra';
export const APP_PACKAGE_ID = 'com.bhaktamarstotra.app';
export const APP_VERSION = packageJson.version;
export const PRIVACY_POLICY_PATH = '/privacy-policy.html';
export const PRIVACY_POLICY_WEB_PLACEHOLDER = 'https://<your-domain>/privacy-policy.html';

export const getPrivacyPolicyUrl = (): string => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return new URL(PRIVACY_POLICY_PATH, window.location.origin).toString();
  }

  return PRIVACY_POLICY_WEB_PLACEHOLDER;
};

export const hasPublicPrivacyPolicyUrl = (): boolean => {
  return !getPrivacyPolicyUrl().includes('<your-domain>');
};
