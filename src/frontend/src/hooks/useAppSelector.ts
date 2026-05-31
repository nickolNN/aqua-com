import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

/** Typed Redux selector hook */
export const useAppSelector = useSelector as unknown as (
  selector: (state: RootState) => unknown,
  comparator?: unknown
) => unknown;
