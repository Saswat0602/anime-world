// 'use client';

// import { useTrendingAnimeQuery } from '@/redux/api/animeApi';
// import { usePaginatedAnime } from '@/hooks/usePaginatedAnime';
// import { AnimeListLayout } from '@/components/Layouts/AnimeListLayout';
// import { useGlobal } from '@/context/GlobalContext';

// export default function TrendingPage() {
//   const {
//     allAnime,
//     loadedAnimeIds,
//     hasMore,
//     loadMoreRef,
//     isLoading,
//     isFetching,
//     handleAnimeLoaded,
//   } = usePaginatedAnime({
//     useQueryHook: useTrendingAnimeQuery,
//     baseQueryParams: {},
//   });
//   const { searchQuery } = useGlobal();
//   console.log(searchQuery, "--------")
//   const pendingItemsCount = 12;

//   return (
//     <AnimeListLayout
//       title="Trending Anime"
//       allAnime={allAnime}
//       loadedAnimeIds={loadedAnimeIds}
//       handleAnimeLoaded={handleAnimeLoaded}
//       pendingItemsCount={pendingItemsCount}
//       loadMoreRef={loadMoreRef}
//       hasMore={hasMore}
//       isLoading={isLoading}
//       isFetching={isFetching}
//     />
//   );
// }


import React from 'react'

const filterPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-red-600'>
      TestFilter
      
    </div>
  )
}

export default filterPage