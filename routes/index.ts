
export const ROUTES = {
    HOME: "/Home",
    TEST: "/test",

    ANIME: {
        ROOT: "/anime",
        TRENDING: "/anime/trending",
        UPCOMING: "/anime/upcoming",
        SEASONAL: "/anime/seasonal",
        TOP_100: "/anime/top-100",
        DETAIL: (id: string | number) => `/anime/${id}`,
    },

};
