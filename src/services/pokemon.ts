import { PokemonSpecie } from "@src/interfaces";
import { http } from "./http";

export const pokemonService = {
  getAll: async ({ offset = 0, limit = 20 }) => {
    const { data } = await http.get("pokemon", {
      params: {
        offset,
        limit,
      },
    });
    return data;
  },
  getSpecieById: async (pokemonId: number) => {
    const { data } = await http.get(`pokemon-species/${pokemonId}/`);
    return data;
  },
  getEvolution: async (pokemonId: number) => {
    return await http.get(`evolution-chain/${pokemonId}/`);
  },
  getByName: async (name: string) => {
    return await http.get(`pokemon/${name.trim().toLowerCase()}`);
  },
};
