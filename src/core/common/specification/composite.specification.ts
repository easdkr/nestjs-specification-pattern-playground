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

export class AndSpecification<T> extends CompositeSpecification<T> {
  constructor(
    private left: ISpecification<T>,
    private right: ISpecification<T>,
  ) {
    super();
  }

  public async isSatisfiedBy(candidate: T): Promise<boolean> {
    return (
      (await this.left.isSatisfiedBy(candidate)) &&
      (await this.right.isSatisfiedBy(candidate))
    );
  }
}

export class NotSpecification<T> extends CompositeSpecification<T> {
  constructor(private specification: ISpecification<T>) {
    super();
  }

  public async isSatisfiedBy(candidate: T): Promise<boolean> {
    return !(await this.specification.isSatisfiedBy(candidate));
  }
}

export class OrSpecification<T> extends CompositeSpecification<T> {
  constructor(
    private left: ISpecification<T>,
    private right: ISpecification<T>,
  ) {
    super();
  }

  public async isSatisfiedBy(candidate: T): Promise<boolean> {
    return (
      (await this.left.isSatisfiedBy(candidate)) ||
      (await this.right.isSatisfiedBy(candidate))
    );
  }
}
