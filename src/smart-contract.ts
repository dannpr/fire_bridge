/** ***********************
 * N.B. The entry file of your AssemblyScript program should be named
 * `src/smart-contract.ts`, the command `yarn build` will produce an
 * `build/smart-contract.wasm` WASM binary!
 **/

import { generate_event, Storage, get_balance, transfer_coins } from "massa-sc-std";
import { JSON } from "json-as";

@json
export class DepositArgs {
    account: string = "";
    amount: u64 = 0;
}

@json
export class WithdrawArgs {
    accountUsr: string = "";
    amount: u64 = 0;
}

export function depositCoins(_args: string): void {
    const args = JSON.parse<DepositArgs>(_args);
    let nbInit: u64 = JSON.parse<u64>(Storage.get_data("tokensInThePool"));
    let nbFinal = args.amount + nbInit;

    Storage.set_data("tokensInThePool", nbFinal.toString())

    let response: string = "You have deposited: " + args.amount.toString() + " MASSA";
    generate_event(response);
}

export function withdrawCoins(_args: string): void {
    const args = JSON.parse<WithdrawArgs>(_args);
    var response: string;

    if(args.amount < JSON.parse<u64>(Storage.get_data("tokensInThePool"))){
        transfer_coins("HrCN5NXRijqYFnqJRvzMiBqGXvrWvdbd4VW7LT7KJPs4hM9C6", args.amount);
        let nbFinal = JSON.parse<u64>(Storage.get_data("tokensInThePool")) - args.amount;
        Storage.set_data("tokensInThePool", nbFinal.toString())
        response = "You have withdrawn: " + args.amount.toString() + " MASSA";
    }else{
        response = "You can't withdraw more than what's in the pool !";
    }
    generate_event(response);
}

export function getTokensInThePool(_args: string): void{
    let response: string = "There is " + get_balance().toString() + " MASSA in the pool";
    generate_event(response);
}