export class MissingParamsError extends Error {
  constructor(paramNames: string[]) {
    super(`Missing params: ${paramNames}!`)
    this.name = 'MissingParamsError'
  }
}
