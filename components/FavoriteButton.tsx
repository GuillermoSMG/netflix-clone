import axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';

import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import { BiLoader } from 'react-icons/bi';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = useMemo(() => {
    return currentUser?.favoriteIds.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    setIsLoading(true);
    let response;
    if (isFavorite) {
      response = await axios.delete(`/api/favorite?movieId=${movieId}`);
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
    setIsLoading(false);
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <button
      onClick={toggleFavorites}
      className='group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
    >
      {isLoading ? (
        <BiLoader
          className='text-white disabled cursor-auto'
          size={25}
        />
      ) : (
        <Icon
          className='text-white'
          size={25}
        />
      )}
    </button>
  );
};
export default FavoriteButton;
