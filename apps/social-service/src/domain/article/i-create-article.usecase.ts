export const ICreateArticleUseCase = Symbol.for('ICreateArticleUseCase');

export interface ICreateArticleUseCase {
  execute(data): Promise<any>;
}
