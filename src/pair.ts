import { OwnershipTransferred } from "../generated/templates/LSSVMPair/LSSVMPair";
import { Pair, PairOwner } from "../generated/schema"

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
    let pair = Pair.load(event.transaction.from.toHex())

    let pairOwner = PairOwner.load(event.params.newOwner.toHex())
    if (pairOwner == null) {
        pairOwner = new PairOwner(event.params.newOwner.toHex())
    }

    pair!.owner = pairOwner.id

    pair!.save()
    pairOwner.save()
}