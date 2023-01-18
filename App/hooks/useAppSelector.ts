import {TypedUseSelectorHook, useSelector} from 'react-redux';
import type {RootState} from '@App/utilis/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
