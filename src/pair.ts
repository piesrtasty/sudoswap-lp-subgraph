import { AssetRecipientChange, DeltaUpdate, FeeUpdate, OwnershipTransferred, SpotPriceUpdate, TokenDeposit } from "../generated/templates/LSSVMPair/LSSVMPair";
import { Pair, PairOwner } from "../generated/schema"

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
    let pair = Pair.load(event.address.toHex())

    let pairOwner = PairOwner.load(event.params.newOwner.toHex())
    if (pairOwner === null) {
        pairOwner = new PairOwner(event.params.newOwner.toHex())
    }

    pair!.owner = pairOwner.id

    pair!.save()
    pairOwner.save()
}

export function handleAssetRecipientChange(event: AssetRecipientChange): void {
    let pair = Pair.load(event.address.toHex())
    pair!.assetRecipient = event.params.a.toHex()
    pair!.save()
}

export function handleDeltaUpdate(event: DeltaUpdate): void {
    let pair = Pair.load(event.address.toHex())
    pair!.delta = event.params.newDelta
    pair!.save()
}

export function handleFeeUpdate(event: FeeUpdate): void {
    let pair = Pair.load(event.address.toHex())
    pair!.fee = event.params.newFee
    pair!.save()
}

export function handleSpotPriceUpdate(event: SpotPriceUpdate): void {
    let pair = Pair.load(event.address.toHex())
    pair!.spotPrice = event.params.newSpotPrice
    pair!.save()
}