import { AddAccountModel } from '../../3 - domain/usecases/add-account'
import { AccountModel } from '../../3 - domain/usecases/models/account'

export interface AddAccountRepository {
  add(newAccount: AddAccountModel): Promise<AccountModel>
}
