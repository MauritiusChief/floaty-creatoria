
EntityEvents.death(event => {
    if (event.entity.type != "minecraft:player") return

    const player = event.entity;
    const level = event.level;
    console.log(player.getX())

    const headItem = level.createEntity('minecraft:item')
    headItem.mergeNbt({Item:{id:"minecraft:player_head", Count:1, tag: {SkullOwner: player.username}}})

    const boneCount = Math.floor(Math.random() * 4) + 3
    const boneItem = level.createEntity('minecraft:item')
    boneItem.mergeNbt({Item:{id:"minecraft:bone", Count:boneCount}})

    let itemArray = [headItem, boneItem]
    itemArray.forEach(item => {
        item.setMotion(0.1*Math.random()-0.05, 0.35, 0.1*Math.random()-0.05)
        item.setPosition(player.getX(), player.getY(), player.getZ())
        item.spawn();
    })
})