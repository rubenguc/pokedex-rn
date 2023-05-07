import { Chain, EvolutionDetail } from "@src/interfaces";

export const getChart = (evol: Chain, chart: any[] = []) => {
  if (evol?.evolves_to.length > 0) {
    for (const [index, _evol] of evol?.evolves_to.entries()) {
      if (chart?.[0]?.from) {
        chart.push({
          from: evol?.species?.name,
          requirements: getEvolutionDetails(
            evol.evolves_to[0].evolution_details[0]
          ),
          to: evol?.evolves_to[0]?.species?.name,
        });
      } else {
        chart.push([
          {
            from: evol?.species?.name,
            requirements: getEvolutionDetails(
              evol.evolves_to[0].evolution_details[0]
            ),
            to: evol?.evolves_to[0]?.species?.name,
          },
        ]);
      }

      getChart(_evol, chart[index]);
    }
  }
  return chart;
};

export const getNamesFromChart = (chart: any[]) => {
  let names: { [key: string]: any } = {};

  chart.forEach((c) => {
    c.forEach((r) => {
      names = {
        ...names,
        [r.to]: undefined,
        [r.from]: undefined,
      };
    });
  });

  return names;
};

const evolutionsDetailsKeys = {
  gender: "gender",
  held_item: "held item",
  item: "item",
  known_move: "move",
  known_move_type: "know move type",
  location: "location",
  min_affection: "min affection",
  min_beauty: "min beauty",
  min_happiness: "min happiness",
  min_level: "min level",
  needs_overworld_rain: "needs overworld rain",
  party_species: "party species",
  party_type: "party type",
  relative_physical_stats: "relative physical stats",
  time_of_day: "time of day",
  trade_species: "trade species",
  turn_upside_down: "turn upside down",
};

export const getEvolutionDetails = (details: EvolutionDetail) => {
  const _details = [];

  for (const key in details) {
    if (key === "trigger") continue;

    if (typeof details[key] === "object" && details[key]?.name) {
      _details.push(`${evolutionsDetailsKeys[key]} ${details[key]?.name}`);
    } else if (!!details[key] && details[key] !== "false") {
      _details.push(`${evolutionsDetailsKeys[key]} ${details[key]}`);
    }
  }

  return _details;
};
