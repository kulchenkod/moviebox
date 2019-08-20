import { create } from 'mobx-persist';

import MovieStore from './MovieStore';

export const hydrateStores = async () => {
   return await create()('movieStore', MovieStore)
}