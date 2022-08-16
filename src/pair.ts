import { AssetRecipientChange, DeltaUpdate, FeeUpdate, OwnershipTransferred, SpotPriceUpdate, TokenDeposit } from "../generated/templates/LSSVMPair/LSSVMPair";
import { Pair, PairOwner } from "../generated/schema"
import { LSSVMPair } from "../generated/templates/LSSVMPair/LSSVMPair";

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

export function handleAssetRecipientChange(event: AssetRecipientChange): void {
    let pair = Pair.load(event.transaction.from.toHex())
    let pairContract = LSSVMPair.bind(event.transaction.from)
    pair!.assetRecipient = pairContract.assetRecipient().toHex()
    pair!.save()
}

export function handleDeltaUpdate(event: DeltaUpdate): void {
    let pair = Pair.load(event.transaction.from.toHex())
    let pairContract = LSSVMPair.bind(event.transaction.from)
    pair!.delta = pairContract.delta()
    pair!.save()
}

export function handleFeeUpdate(event: FeeUpdate): void {
    let pair = Pair.load(event.transaction.from.toHex())
    let pairContract = LSSVMPair.bind(event.transaction.from)
    pair!.fee = pairContract.fee()
    pair!.save()
}

export function handleSpotPriceUpdate(event: SpotPriceUpdate): void {
    let pair = Pair.load(event.transaction.from.toHex())
    let pairContract = LSSVMPair.bind(event.transaction.from)
    pair!.spotPrice = pairContract.spotPrice()
    pair!.save()
}