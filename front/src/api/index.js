import axios from 'axios';
import ApiConstants from 'src/api/ApiConstants';

import store from 'src/store';

const getFormRequestOptions = (location, parameters) => {
    const urlEncodedParameters = new URLSearchParams();
    for (const [key, value] of Object.entries(parameters)) {
        urlEncodedParameters.append(key, value);
    }

    return [
        `${ApiConstants.API_BASE_URL}/${location}`,
        urlEncodedParameters,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    ];
};

const Api = {
    async register(email, password) {
        const requestOptions = getFormRequestOptions('register', { email, password });
        const response = await axios.post(...requestOptions);

        return response;
    },
    async login(email, password) {
        const requestOptions = getFormRequestOptions('login', { email, password });
        const response = await axios.post(...requestOptions);

        return response;
    },
    async logout() {
        const response = await axios.put(`${ApiConstants.API_BASE_URL}/logout`);

        return response;
    },
    async getContent() {
        store.menuSetIsLoading(true);

        const response = await axios.get(`${ApiConstants.API_BASE_URL}/content`);

        store.menuSetIsLoading(false);
        store.menuSetIsLoaded();

        return response;
    },
    async getParagraphs(chapterId) {
        const response = await axios.get(`${ApiConstants.API_BASE_URL}/chapters/${chapterId}/paragraphs`);

        return response;
    },
    async getCurrentStep(chapterId, stepId) {
        const response = await axios.get(
            `${ApiConstants.API_BASE_URL}/chapters/${chapterId}/paragraphs?current_step=${stepId}`
        );

        return response;
    },
    async getNextStep(stepId) {
        const response = await axios.get(`${ApiConstants.API_BASE_URL}/steps/${stepId}/next`);

        return response;
    },
    async getAnswerExplanation(body) {
        const response = await axios.post(`${ApiConstants.API_BASE_URL}/answer/explanation`, JSON.stringify(body), {
            headers: { 'Content-Type': 'text/plain' },
        });

        return response;
    },
};

export default Api;
