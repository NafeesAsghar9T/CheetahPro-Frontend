import {useDispatch} from 'react-redux';
import type {AppDispatch} from '@App/utilis/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
