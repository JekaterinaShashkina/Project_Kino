import axios from 'axios';
import { API_URL } from '../../constants/env';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};