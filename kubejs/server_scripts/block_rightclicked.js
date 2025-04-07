
BlockEvents.rightClicked(event => {
    let block = event.block;
    let item = event.item;
    let level = event.level;
    let player = event.player;
    if (block.id == "supplementaries:ash" && item.hasTag('minecraft:shovels') &&
    block.y > -64 && level.getBlock(block.x, block.y - 1, block.z).id == "minecraft:dirt") {
        let blockState = block.getBlockState();
        let property0 = blockState.getProperties().toArray()[0]
        let layer = blockState.getValue(property0);
        // console.log(layer)
        if (Math.random() < layer * 1.0/8) {
            block.set('air')
            level.getBlock(block.x, block.y - 1, block.z).set('coarse_dirt')
        }
        // item.damageValue(1)

        level.spawnParticles('supplementaries:ash', true, block.x + 0.5, block.y, block.z + 0.5, 0.2, 0.2, 0.2, 5, 0.1);
        level.playSound(null, block.x, block.y, block.z, 'minecraft:item.shovel.flatten', 'blocks', 1.0, 1.0);
        event.success()

    } else if (block.id == "minecraft:coarse_dirt" && item.hasTag('minecraft:hoes')) {
        if (Math.random() < 1.0/4) {
            const pebbleItem = level.createEntity('minecraft:item')
            pebbleItem.mergeNbt({Item:{id:"kubejs:pebble", Count:1}})
            pebbleItem.setMotion(0.1*Math.random()-0.05, 0.2, 0.1*Math.random()-0.05)
            pebbleItem.setPosition(block.x + 0.5, block.y + 1.0, block.z + 0.5)
            pebbleItem.spawn();
        }
    }
})