// Utility functions for generating structured data (JSON-LD)

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimerAppData {
  name: string;
  description: string;
  url: string;
  minutes?: number;
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate SoftwareApplication structured data
export function generateSoftwareAppStructuredData(data: TimerAppData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: 'Productivity',
    applicationSubCategory: 'Timer',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Modern web browser with JavaScript support',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    features: [
      'Customizable timer duration (1-1440 minutes)',
      'Background music and sounds',
      'Pomodoro technique support',
      'Browser notifications',
      'Keyboard shortcuts',
      'Mobile responsive design',
      'No registration required',
    ],
  };
}

// Generate WebSite structured data
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Timer with Music',
    alternateName: 'Online Timer with Background Music',
    description: 'Free online countdown timer with relaxing background music. Perfect for study, work, meditation, and focus sessions.',
    url: 'https://timerwithmusics.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://timerwithmusics.com/timer/{search_term_string}-minutes-music',
      },
      'query-input': 'required name=search_term_string',
    },
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Timer with Music',
      applicationCategory: 'Productivity',
      operatingSystem: 'Web Browser',
    },
  };
}

// Generate HowTo structured data for timer usage
export function generateHowToStructuredData(minutes?: number) {
  const timeText = minutes ? `${minutes}-minute` : 'custom duration';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use ${timeText} Timer with Music`,
    description: `Step-by-step guide to using our ${timeText} online countdown timer with background music for productivity and focus.`,
    image: minutes 
      ? `https://timerwithmusics.com/api/og?m=${minutes}`
      : 'https://timerwithmusics.com/api/og?m=25',
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Web browser with internet connection',
      },
      {
        '@type': 'HowToSupply',
        name: 'Device with speakers or headphones (optional)',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Timer with Music web application',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Set Timer Duration',
        text: minutes 
          ? `The timer is pre-set to ${minutes} minutes for optimal ${getUseCase(minutes)}.`
          : 'Choose your desired duration using the time picker or preset buttons.',
        image: 'https://timerwithmusics.com/api/og?m=25',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose Background Sound',
        text: 'Select from rain sounds, ocean waves, café ambiance, white noise, or silent mode.',
      },
      {
        '@type': 'HowToStep',
        name: 'Start the Timer',
        text: 'Click the Start button or press the spacebar to begin your countdown with background music.',
      },
      {
        '@type': 'HowToStep',
        name: 'Focus on Your Task',
        text: 'Work, study, or relax while the timer counts down with your chosen background sounds.',
      },
    ],
  };
}

// Generate Article structured data for informational content
export function generateArticleStructuredData(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Timer with Music',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Timer with Music',
      url: 'https://timerwithmusics.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

// Helper function to get use case based on timer duration
function getUseCase(minutes: number): string {
  if (minutes === 1) return 'quick focus bursts';
  if (minutes <= 5) return 'short focused sessions';
  if (minutes <= 15) return 'study sprints and focused work';
  if (minutes === 25) return 'pomodoro technique and deep work';
  if (minutes <= 60) return 'extended focus sessions';
  return 'long-form deep work';
}

// Combine multiple structured data objects
export function combineStructuredData(...dataObjects: object[]) {
  return dataObjects.map(data => JSON.stringify(data)).join('\n\n');
}