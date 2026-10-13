export interface ValidationResult<T> {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 15;
}

export function validateConsultationForm(data: {
  fullName: string;
  email: string;
  phone: string;
  applicantObjective: string;
  ndprConsent: boolean;
}): ValidationResult<{
  fullName: string;
  email: string;
  phone: string;
  applicantObjective: string;
  ndprConsent: boolean;
}> {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Please enter your full legal name (at least 3 characters).';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Please provide a valid phone or WhatsApp number.';
  }

  if (!data.applicantObjective || data.applicantObjective.trim().length < 10) {
    errors.applicantObjective = 'Please explain your travel or relocation objective in at least 10 characters.';
  }

  if (!data.ndprConsent) {
    errors.ndprConsent = 'You must agree to the data privacy and processing terms.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateContactForm(data: {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  ndprConsent: boolean;
}): ValidationResult<{
  fullName: string;
  email: string;
  phone: string;
  message: string;
  ndprConsent: boolean;
}> {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required.';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Valid email is required.';
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Valid contact phone number is required.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide a detailed inquiry message (minimum 10 characters).';
  }

  if (!data.ndprConsent) {
    errors.ndprConsent = 'Consent is required to submit your information.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateJobApplication(data: {
  fullName: string;
  email: string;
  phone: string;
  highestEducation: string;
  yearsExperience: string;
  confirmedNoGuarantees: boolean;
  ndprConsent: boolean;
}): ValidationResult<{
  fullName: string;
  email: string;
  phone: string;
  highestEducation: string;
  yearsExperience: string;
  confirmedNoGuarantees: boolean;
  ndprConsent: boolean;
}> {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Legal name is required.';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Valid email address is required.';
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Valid telephone/WhatsApp number is required.';
  }

  if (!data.highestEducation) {
    errors.highestEducation = 'Please indicate your highest completed education.';
  }

  if (!data.yearsExperience) {
    errors.yearsExperience = 'Please indicate your relevant years of experience.';
  }

  if (!data.confirmedNoGuarantees) {
    errors.confirmedNoGuarantees = 'You must acknowledge that employment and visa outcomes are never guaranteed.';
  }

  if (!data.ndprConsent) {
    errors.ndprConsent = 'You must consent to privacy terms.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
