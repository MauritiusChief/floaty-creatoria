
BlockEvents.rightClicked(event => {
    let block = event.block;
    let item = event.item;
    let level = event.level;
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
        level.spawnParticles('supplementaries:ash', true, block.x + 0.5, block.y, block.z + 0.5, 0.2, 0.2, 0.2, 5, 0.1);
        level.playSound(null, block.x, block.y, block.z, 'minecraft:item.shovel.flatten', 'blocks', 1.0, 1.0);

        event.success()
    }
})