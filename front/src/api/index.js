import axios from 'axios';
import Cookies from 'js-cookie';
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

const logoutUnauthenticatedUser = (error) => {
    if (error.response && error.response.status === 401) {
        Cookies.remove('gw_email', { domain: ApiConstants.API_COOKIE_DOMAIN });
        window.location.href = '/signin';
    }

    return new Promise((resolve, reject) => {
        reject(error);
    });
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

        const response = await axios.get(`${ApiConstants.API_BASE_URL}/content`).catch(logoutUnauthenticatedUser);

        store.menuSetIsLoading(false);
        store.menuSetIsLoaded(true);

        return response;
    },
    async getParagraphs(chapterId, stepId) {
        const queryString = stepId ? `?current_step=${stepId}` : '';
        const response = await axios
            .get(`${ApiConstants.API_BASE_URL}/chapters/${chapterId}/paragraphs${queryString}`)
            .catch(logoutUnauthenticatedUser);

        return response;
    },
    async getNextStep(stepId) {
        const response = await axios
            .get(`${ApiConstants.API_BASE_URL}/steps/${stepId}/next`)
            .catch(logoutUnauthenticatedUser);

        return response;
    },
    async getAnswerExplanation(body) {
        const response = await axios
            .post(`${ApiConstants.API_BASE_URL}/answer/explanation`, JSON.stringify(body), {
                headers: { 'Content-Type': 'text/plain' },
            })
            .catch(logoutUnauthenticatedUser);

        return response;
    },
};

export default Api;
