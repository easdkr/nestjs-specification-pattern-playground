import { AndSpecification } from './and.specification';
import { NotSpecification } from './not.specification';
import { OrSpecification } from './or.specification';
import { ISpecification } from './specification.interfact';

export abstract class CompositeSpecification<T> implements ISpecification<T> {
  public abstract isSatisfiedBy(candidate: T): Promise<boolean> | boolean;

  public and(other: ISpecification<T>): ISpecification<T> {
    return new AndSpecification<T>(this, other);
  }
  public or(other: ISpecification<T>): ISpecification<T> {
    return new OrSpecification<T>(this, other);
  }
  public not(): ISpecification<T> {
    return new NotSpecification<T>(this);
  }
}
