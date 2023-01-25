export interface PaginatedResponse {
  metadata: PaginationMetadata;
}

export interface PaginationMetadata {
  total: number;
  hasMore: boolean;
  nextOffset: number;
}

export interface PaginationParams {
  offset: number;
  limit: number;
}
