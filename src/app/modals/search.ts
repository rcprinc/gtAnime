export interface Data {
    data:  Datum[];
}

export interface Datum {
    attributes:    Attributes;
}

export interface Attributes {
    titles:              Titles;
    createdAt:           Date;
    description:         string;
    averageRating:       null | string;
    episodeCount:        number;
    showType:            string;
    synopsis:            string;
    startDate:           Date;
    endDate:             Date | null;
    totalLength:         number;
}

export interface Titles {
    en:     string;
    en_jp:  string;
    ja_jp:  string;
    en_us?: string;
}


// export interface Data {
//     data:  Datum[];
// }

// export interface Datum {
//     id:            string;
//     type:          string;
//     links:         DatumLinks;
//     attributes:    Attributes;
//     relationships: { [key: string]: Relationship };
// }

// export interface Attributes {
//     createdAt:           Date;
//     updatedAt:           Date;
//     slug:                string;
//     synopsis:            string;
//     description:         string;
//     coverImageTopOffset: number;
//     titles:              Titles;
//     canonicalTitle:      string;
//     abbreviatedTitles:   string[];
//     averageRating:       null | string;
//     ratingFrequencies:   { [key: string]: string };
//     userCount:           number;
//     favoritesCount:      number;
//     startDate:           Date;
//     endDate:             Date | null;
//     nextRelease:         null;
//     popularityRank:      number;
//     ratingRank:          number | null;
//     ageRating:           string;
//     ageRatingGuide:      string;
//     subtype:             string;
//     status:              string;
//     tba:                 null | string;
//     posterImage:         PosterImage;
//     coverImage:          CoverImage | null;
//     episodeCount:        number;
//     episodeLength:       number;
//     totalLength:         number;
//     youtubeVideoId:      null | string;
//     showType:            string;
//     nsfw:                boolean;
// }

// export interface CoverImage {
//     tiny:     string;
//     large:    string;
//     small:    string;
//     original: string;
//     meta:     CoverImageMeta;
// }

// export interface CoverImageMeta {
//     dimensions: Dimensions;
// }

// export interface Dimensions {
//     tiny:    Large;
//     large:   Large;
//     small:   Large;
//     medium?: Large;
// }

// export interface Large {
//     width:  number;
//     height: number;
// }

// export interface PosterImage {
//     tiny:     string;
//     large:    string;
//     small:    string;
//     medium:   string;
//     original: string;
//     meta:     CoverImageMeta;
// }

// export interface Titles {
//     en:     string;
//     en_jp:  string;
//     ja_jp:  string;
//     en_us?: string;
// }

// export interface DatumLinks {
//     self: string;
// }

// export interface Relationship {
//     links: RelationshipLinks;
// }

// export interface RelationshipLinks {
//     self:    string;
//     related: string;
// }

// export interface DataLinks {
//     first: string;
//     last:  string;
// }

// export interface DataMeta {
//     count: number;
// }
