import { CompositeSpecification } from './composite.specification';
import { ISpecification } from './specification.interfact';

export class NotSpecification<T> extends CompositeSpecification<T> {
  constructor(private specification: ISpecification<T>) {
    super();
  }

  public async isSatisfiedBy(candidate: T): Promise<boolean> {
    return !(await this.specification.isSatisfiedBy(candidate));
  }
}
