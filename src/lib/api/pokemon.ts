import httpClient from "@/src/lib/http-client";
import {
  PokemonList,
  PokemonDetailApi,
  PokeType,
  PokemonData,
  PokeApi,
} from "@/src/type/pokemon";

const getPokemonList = async (): Promise<PokemonList[]> => {
  const { results } = await httpClient<PokeApi>(
    "https://pokeapi.co/api/v2/pokemon?limit=50",
    { method: "GET", renderMode: "SSR" },
  );

  return results;
};

// TODO: to make below as function instead for testing purpose
export const getPokemonData = async (): Promise<PokemonData> => {
  const pokemonList = await getPokemonList();

  const pokemonDetailList = await Promise.all(
    pokemonList.map(async ({ url }: PokemonList) => {
      const pokemonDetail = await httpClient<PokemonDetailApi>(url, {
        method: "GET",
        renderMode: "SSR",
      });

      return {
        name: pokemonDetail.name,
        image: pokemonDetail.sprites.other["official-artwork"].front_default,
        type: pokemonDetail.types.map(
          (typeItem: PokeType) => typeItem.type.name,
        ),
        gifs: Object.values(pokemonDetail.sprites.other.showdown).filter(
          (gif): gif is string => Boolean(gif),
        ),
        moves: pokemonDetail.moves.slice(0, 4).map((move) => move.move.name),
        abilities: pokemonDetail.abilities
          .slice(0, 4)
          .map((ability) => ability.ability.name),
      };
    }),
  );

  const allCategories = Array.from(
    new Set(pokemonDetailList.map((pokemon) => pokemon.type).flat()),
  );

  return { pokemonDetailList, allCategories };
};
