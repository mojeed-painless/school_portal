import axios from 'axios';
import { retryableRequest } from '../utils/apiRetry';
import {
    UpdateStudentScoresPayloadSchema,
    SaveResultsPayloadSchema,
} from '../schemas/resultSchemas';
import { reportError } from '../utils/errorHandler';

const API_BASE_URL = (() => {
    const configuredBase = import.meta.env.VITE_API_BASE_URL || '/api';
    const normalizedBase = configuredBase.replace(/\/$/, '');
    return normalizedBase.endsWith('/api') ? normalizedBase : `${normalizedBase}/api`;
})();

const normalizeScoreValue = (value, fallback = 0) => {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : fallback;
};

const normalizeScoresForSchema = (scores) => {
    if (!scores || typeof scores !== 'object') {
        return { caScore: 0, examScore: 0 };
    }

    if ('caScore' in scores || 'examScore' in scores) {
        return {
            caScore: normalizeScoreValue(scores.caScore, 0),
            examScore: normalizeScoreValue(scores.examScore, 0),
        };
    }

    return {
        caScore: normalizeScoreValue(scores.ca ?? scores.test ?? scores.continuousAssessment ?? scores.continuousAssessmentScore, 0),
        examScore: normalizeScoreValue(scores.exam ?? scores.finalExam ?? scores.totalExam, 0),
    };
};

const buildQuery = (params) => {
    const query = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            query.append(key, value);
        }
    });
    return query.toString();
};

// Get results for a specific academic year
export const getResultsByYear = async (academicYear) => {
    try {
        const response = await retryableRequest(() =>
            axios.get(`${API_BASE_URL}/results/${encodeURIComponent(academicYear)}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        );
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return {};
        }
        reportError(error, { api: 'results', action: 'getResultsByYear', academicYear });
        throw error;
    }
};

// Get results for a specific academic year and term
export const getResultsByYearAndTerm = async (academicYear, termName) => {
    try {
        const response = await retryableRequest(() =>
            axios.get(`${API_BASE_URL}/results/${encodeURIComponent(academicYear)}/${encodeURIComponent(termName)}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        );
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return {};
        }
        reportError(error, { api: 'results', action: 'getResultsByYearAndTerm', academicYear, termName });
        throw error;
    }
};

// Get results for a specific academic year, term, and class
export const getResultsByYearTermClass = async (academicYear, termName, className, department) => {
    try {
        const query = buildQuery({ department });
        const path = `${API_BASE_URL}/results/${encodeURIComponent(academicYear)}/${encodeURIComponent(termName)}/${encodeURIComponent(className)}${query ? `?${query}` : ''}`;
        const response = await retryableRequest(() =>
            axios.get(path, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        );
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return {};
        }
        reportError(error, { api: 'results', action: 'getResultsByYearTermClass', academicYear, termName, className, department });
        throw error;
    }
};

// Save or update results
export const saveResults = async (resultsData) => {
    const validatedPayload = SaveResultsPayloadSchema.parse(resultsData);
    try {
        const response = await retryableRequest(() =>
            axios.post(`${API_BASE_URL}/results/save`, validatedPayload)
        );
        return response.data;
    } catch (error) {
        reportError(error, { api: 'results', action: 'saveResults', payload: resultsData });
        throw error;
    }
};

// Update student scores
export const updateStudentScores = async (...args) => {
    if (args.length === 1 && args[0] && typeof args[0] === 'object') {
        const validatedPayload = UpdateStudentScoresPayloadSchema.parse(args[0]);
        try {
            const response = await retryableRequest(() =>
                axios.put(`${API_BASE_URL}/results/update`, validatedPayload)
            );
            return response.data;
        } catch (error) {
            reportError(error, { api: 'results', action: 'updateStudentScores', payload: args[0] });
            throw error;
        }
    }

    const [academicYear, termName, className, studentId, scores] = args;
    const normalizedScores = normalizeScoresForSchema(scores);
    const payload = {
        studentId: String(studentId),
        subject: String(className),
        term: String(termName),
        session: String(academicYear),
        scores: normalizedScores,
    };

    try {
        const validatedPayload = UpdateStudentScoresPayloadSchema.parse(payload);
        const response = await retryableRequest(() =>
            axios.put(`${API_BASE_URL}/results/${encodeURIComponent(academicYear)}/${encodeURIComponent(termName)}/${encodeURIComponent(className)}/${encodeURIComponent(studentId)}`, validatedPayload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        );
        return response.data;
    } catch (error) {
        reportError(error, { api: 'results', action: 'updateStudentScores', academicYear, termName, className, studentId, scores });
        throw error;
    }
};

// Submit for approval
export const submitForApproval = async (academicYear, termName, className, department) => {
    try {
        const query = buildQuery({ department });
        const path = `${API_BASE_URL}/results/${encodeURIComponent(academicYear)}/${encodeURIComponent(termName)}/${encodeURIComponent(className)}/submit-approval${query ? `?${query}` : ''}`;
        const response = await retryableRequest(() =>
            axios.put(path, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        );
        return response.data;
    } catch (error) {
        reportError(error, { api: 'results', action: 'submitForApproval', academicYear, termName, className, department });
        throw error;
    }
};

// Update removed subjects
export const updateRemovedSubjects = async (academicYear, termName, className, removedSubjects, department) => {
    try {
        const query = buildQuery({ department });
        const path = `${API_BASE_URL}/results/${encodeURIComponent(academicYear)}/${encodeURIComponent(termName)}/${encodeURIComponent(className)}/removed-subjects${query ? `?${query}` : ''}`;
        const response = await retryableRequest(() =>
            axios.put(path, { removedSubjects }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        );
        return response.data;
    } catch (error) {
        reportError(error, { api: 'results', action: 'updateRemovedSubjects', academicYear, termName, className, removedSubjects, department });
        throw error;
    }
};

// Approve results
export const approveResults = async (academicYear, termName, className, department) => {
    try {
        const query = buildQuery({ department });
        const path = `${API_BASE_URL}/results/${encodeURIComponent(academicYear)}/${encodeURIComponent(termName)}/${encodeURIComponent(className)}/approve${query ? `?${query}` : ''}`;
        const response = await retryableRequest(() =>
            axios.put(path, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        );
        return response.data;
    } catch (error) {
        reportError(error, { api: 'results', action: 'approveResults', academicYear, termName, className, department });
        throw error;
    }
};

// Reject results
export const rejectResults = async (academicYear, termName, className, department) => {
    try {
        const query = buildQuery({ department });
        const path = `${API_BASE_URL}/results/${encodeURIComponent(academicYear)}/${encodeURIComponent(termName)}/${encodeURIComponent(className)}/reject${query ? `?${query}` : ''}`;
        const response = await retryableRequest(() =>
            axios.put(path, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        );
        return response.data;
    } catch (error) {
        reportError(error, { api: 'results', action: 'rejectResults', academicYear, termName, className, department });
        throw error;
    }
};

// Reverse approval
export const reverseApproval = async (academicYear, termName, className, department) => {
    try {
        const query = buildQuery({ department });
        const path = `${API_BASE_URL}/results/${encodeURIComponent(academicYear)}/${encodeURIComponent(termName)}/${encodeURIComponent(className)}/reverse-approval${query ? `?${query}` : ''}`;
        const response = await retryableRequest(() =>
            axios.put(path, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        );
        return response.data;
    } catch (error) {
        reportError(error, { api: 'results', action: 'reverseApproval', academicYear, termName, className, department });
        throw error;
    }
};

// Get approval status
export const getApprovalStatus = async (academicYear, termName, className, department) => {
    try {
        const query = buildQuery({ department });
        const path = `${API_BASE_URL}/results/${encodeURIComponent(academicYear)}/${encodeURIComponent(termName)}/${encodeURIComponent(className)}/status${query ? `?${query}` : ''}`;
        const response = await axios.get(path, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return { approvalStatus: null };
        }
        reportError(error, { api: 'results', action: 'getApprovalStatus', academicYear, termName, className, department });
        throw error;
    }
};