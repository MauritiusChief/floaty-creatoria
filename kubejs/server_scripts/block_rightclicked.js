const $Integer = Java.loadClass('java.lang.Integer');

BlockEvents.rightClicked(event => {
    let block = event.block;
    let item = event.item;
    let level = event.level;
    let player = event.player;

    if (block.id == "supplementaries:ash" && item.hasTag('minecraft:shovels') &&
    block.y > -64 && level.getBlock(block.pos.below()).id == "minecraft:dirt") {
        let blockState = block.getBlockState();
        // console.log(blockState)
        // console.log(blockState.getValue(BlockProperties.LAYERS))
        let layer = blockState.getValue(BlockProperties.LAYERS);
        // console.log(layer)
        if (Math.random() < 1.0/8) {
            if ( layer > 1) {
                let newState = blockState.setValue(BlockProperties.LAYERS, $Integer.valueOf( parseInt(layer-1).toString() ))
                level.setBlock(block.getPos(), newState, 1)
            } else {
                block.set('air')
            }
            level.getBlock(block.x, block.y - 1, block.z).set('coarse_dirt')
        }
        // item.damageValue(1)

        level.spawnParticles('supplementaries:ash', true, block.x + 0.5, block.y, block.z + 0.5, 0.2, 0.2, 0.2, 5, 0.1);
        level.playSound(null, block.x, block.y, block.z, 'minecraft:item.shovel.flatten', 'blocks', 1.0, 1.0);
        event.success()
        return
    }
    
    if (block.id == "minecraft:coarse_dirt" && level.getBlock(block.pos.above()).id == "minecraft:air" && 
        (item.hasTag('minecraft:shovels') || item.hasTag('minecraft:hoes')) && Math.random() < 4.0/5
    ) {
        const pebbleItem = level.createEntity('minecraft:item')
        const pebbleCount = Math.ceil(Math.random()*4)
        pebbleItem.mergeNbt({Item:{id:"kubejs:pebble", Count:pebbleCount}})
        pebbleItem.setMotion(0.1*Math.random()-0.05, 0.2, 0.1*Math.random()-0.05)
        pebbleItem.setPosition(block.x + 0.5, block.y + 1.0, block.z + 0.5)
        pebbleItem.spawn();
        return
    }

    if (block.id == "minecraft:flower_pot" && item.id == "kubejs:rotten_apple") {
        item.count--
        if (Math.random() < 1.0/8) {
            block.set("potted_oak_sapling")
        }
        level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 0.5, block.z + 0.5, 0.2, 0.2, 0.2, 10, 0.1);
        event.success()
    }
})