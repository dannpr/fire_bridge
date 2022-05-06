
import { Storage, include_base64, generate_event, create_sc } from "massa-sc-std";

export function main(_args: string): void {
    const bytes = include_base64('./build/smart-contract.wasm');
    Storage.set_data("tokensInThePool", "0");
    Storage.set_bytecode(bytes);
    generate_event("Smart contract deployed !");
}
