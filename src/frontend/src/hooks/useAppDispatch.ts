import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';

/** Typed Redux dispatch hook */
export const useAppDispatch = () => useDispatch<AppDispatch>();
