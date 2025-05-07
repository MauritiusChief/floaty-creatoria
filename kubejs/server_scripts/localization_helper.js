
ServerEvents.loaded( e => {
    const discs = ["11", "13", "blocks", "cat", "chirp", "far", "mall", "mellohi", "stal", "strad", "wait", "ward"]
    // const disc_descs = {"11": "§8暗之元素", "13": "§f光之元素", "blocks": "§c火之元素", "cat": "§2木之元素", "chirp": "§3时间元素", "far": "§b风之元素", "mall": "§9冰之元素", "mellohi": "§d空间元素", "stal": "§7土之元素", "strad": "§6金之元素", "wait": "§3水之元素", "ward": "§e电之元素"}
    const disc_descs = {"11": "§8Dark Elemental", "13": "§fLight Elemental", "blocks": "§cFire Elemental", "cat": "§2Wood Elemental", "chirp": "§3Time Elemental", "far": "§bWind Elemental", "mall": "§9Ice Elemental", "mellohi": "§dSpace Elemental", "stal": "§7Earth Elemental", "strad": "§6Metal Elemental", "wait": "§3Water Elemental", "ward": "§eElectron Elemental"}
    discs.forEach( disc => {
        // console.log(`"item.kubejs.proto_frame_${disc}": "谐振唱片基底(${disc})",`)
        // console.log(`"item.kubejs.filled_frame_${disc}": "传送偏振框架(${disc})",`)
        // console.log(`"tooltip.proto_frame_${disc}": "§7需填充${disc_descs[disc]}",`)
        console.log(`"item.kubejs.proto_frame_${disc}": "Resonant Disk Base (${disc})",`)
        console.log(`"item.kubejs.filled_frame_${disc}": "Portal Polarization Frame (${disc})",`)
        console.log(`"tooltip.proto_frame_${disc}": "§7Needs to be filled with ${disc_descs[disc]}",`)
    })
})