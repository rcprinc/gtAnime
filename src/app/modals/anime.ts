export interface Anime {
    day: number;
    year: number;
    images: string[];
    names: string[];
    nameContains: string;
    completed?: number;
}

export interface AllAnimes {
    anime: Anime[]
  } 