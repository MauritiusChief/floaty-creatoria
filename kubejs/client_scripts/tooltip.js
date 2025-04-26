
ItemEvents.tooltip(tooltip => {
    const discs = ["11", "13", "blocks", "cat", "chirp", "far", "mall", "mellohi", "stal", "strad", "wait", "ward"]
    const disc_descs = {"11": "§8暗之元素", "13": "§f光之元素", "blocks": "§c火之元素", "cat": "§2木之元素", "chirp": "§3时间元素", "far": "§b风之元素", "mall": "§9冰之元素", "mellohi": "§d空间元素", "stal": "§7土之元素", "strad": "§6金之元素", "wait": "§3水之元素", "ward": "§e电之元素"}
    discs.forEach( disc => {
        tooltip.add(`kubejs:proto_frame_${disc}`, `§7需填充${disc_descs[disc]}`)
    })
})