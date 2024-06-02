import { CompositeSpecification } from './composite.specification';
import { ISpecification } from './specification.interfact';

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
