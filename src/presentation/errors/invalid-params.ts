export class InvalidParamsError extends Error {
  constructor(paramNames: string) {
    super(`Invalid params: ${paramNames}!`)
    this.name = 'InvalidParamsError'
  }
}
