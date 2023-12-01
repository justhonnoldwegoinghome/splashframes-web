export interface APIList<ResultType> {
  next_page_token: string | null;
  results: ResultType[];
}
