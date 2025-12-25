// Google Analytics utility functions
// Google Analytics is initialized via script tag in index.html
// This file provides utility functions for custom event tracking

const GA_MEASUREMENT_ID = 'G-ZPSM69PWHH';

/**
 * Initialize Google Analytics (if needed)
 * Note: GA is already initialized via script tag in index.html
 * This function is kept for compatibility
 */
export const initGA = () => {
  // Google Analytics is already loaded via script tag in index.html
  // Just verify gtag is available
  if (!window.gtag) {
    console.warn('Google Analytics: gtag is not available');
    return;
  }
};

/**
 * Track page view
 * Call this when the route changes
 */
export const trackPageView = (path) => {
  if (!window.gtag) {
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: document.title,
  });
};

/**
 * Track custom events
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Additional event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (!window.gtag) {
    return;
  }

  window.gtag('event', eventName, eventParams);
};

/**
 * Track button clicks
 * @param {string} buttonName - Name/identifier of the button
 * @param {string} location - Where the button is located (optional)
 */
export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

/**
 * Track form submissions
 * @param {string} formName - Name of the form
 */
export const trackFormSubmit = (formName) => {
  trackEvent('form_submit', {
    form_name: formName,
  });
};

/**
 * Track project views
 * @param {string} projectName - Name of the project
 */
export const trackProjectView = (projectName) => {
  trackEvent('project_view', {
    project_name: projectName,
  });
};

/**
 * Track external link clicks
 * @param {string} linkUrl - URL of the external link
 * @param {string} linkText - Text of the link
 */
export const trackExternalLink = (linkUrl, linkText) => {
  trackEvent('external_link_click', {
    link_url: linkUrl,
    link_text: linkText,
  });
};

