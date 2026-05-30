// API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  error: string | null;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Query params for filtering
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}
