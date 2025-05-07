
ItemEvents.tooltip(tooltip => {
    const discs = ["11", "13", "blocks", "cat", "chirp", "far", "mall", "mellohi", "stal", "strad", "wait", "ward"]
    discs.forEach( disc => {
        // tooltip.add(`kubejs:proto_frame_${disc}`, `§7需填充${disc_descs[disc]}`)
        tooltip.add(`kubejs:proto_frame_${disc}`, Text.of(Component.translate(`tooltip.proto_frame_${disc}`)))
    })
})