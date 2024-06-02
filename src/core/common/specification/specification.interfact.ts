export interface ISpecification<T> {
  isSatisfiedBy(candidate: T): Promise<boolean> | boolean;
  and(other: ISpecification<T>): ISpecification<T>;
  or(other: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
}
