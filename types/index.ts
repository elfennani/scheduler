declare global {
    type Modify<T, R> = Omit<T, keyof R> & R;
}
export {};
