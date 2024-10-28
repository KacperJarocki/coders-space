export type ListFetchingError = { state: number, message: string };
///idle
type IdleState = { state: 'idle' };
//Loading
type LoadingState = { state: 'loading' };
//success
type SuccessState<T> = { state: 'success', results: T[] };
//error
type ErrorState = { state: 'error', error: ListFetchingError };

export type ComponentListState<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;
