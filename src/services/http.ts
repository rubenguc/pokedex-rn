import axios from 'axios';

export const baseURL = 'https://pokeapi.co/api/v2/';

export const http = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
