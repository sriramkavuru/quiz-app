import axios from 'axios';

const API = axios.create({
  baseURL: 'https://quizapp-backend-01o2.onrender.com/api/quiz',
});

export const fetchQuizQuestions = async (category, difficulty, limit) => {
  try {
    const response = await API.get('/', {
      params: { category, difficulty, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
};

export default API;
