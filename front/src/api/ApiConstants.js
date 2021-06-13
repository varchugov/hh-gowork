const ApiConstants = {
    API_BASE_URL: process.env.NODE_ENV === 'production' ? '/backend' : process.env.API_BASE_URL || '',
    API_COOKIE_DOMAIN: window.location.hostname === 'localhost' ? 'localhost' : `.${window.location.hostname}`,
};

export default ApiConstants;
