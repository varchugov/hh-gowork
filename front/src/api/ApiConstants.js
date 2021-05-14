const ApiConstants = {
    API_BASE_URL: process.env.NODE_ENV === 'production' ? '/backend' : process.env.API_BASE_URL || '',
};

export default ApiConstants;
