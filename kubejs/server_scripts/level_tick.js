
LevelEvents.tick(event => {
    const level = event.level;

    level.getEntities().forEach( entity => {

        /**forEach处理掉物品和经验球掉虚空 */
        if ((entity.type == "minecraft:item" || entity.type == "minecraft:experience_orb") && entity.getY() <= -32) {
            // 物品和经验球不会落入虚空
            if (!entity.persistentData.getInt("forgiving")) {entity.mergeNbt({NoGravity: true})}
            let currY =  entity.getY()
            let currYmotion = entity.getMotionY()
            if (currY > -40 && entity.persistentData.getInt("forgiving") != 1) { // -32 ~ -40 阶段一
                entity.setMotionY(currYmotion * 0.8)
                // event.server.tell("阶段一减速")
                entity.persistentData.putInt("forgiving", 1)
            } else if (currY <= -40 && currY > -48 && entity.persistentData.getInt("forgiving") != 2) { // -40 ~ -48 阶段二
                entity.setMotionY(currYmotion * 0.7)
                // event.server.tell("阶段二减速")
                entity.persistentData.putInt("forgiving", 2)
            } else if (currY <= -48 && currY > -56 && entity.persistentData.getInt("forgiving") != 3) { // -48 ~ -56 阶段三
                entity.setMotionY(currYmotion * 0.6)
                // event.server.tell("阶段三减速")
                entity.persistentData.putInt("forgiving", 3)
            } else if (currY <= -56 && entity.persistentData.getInt("forgiving") != 4) { // -56 以下 阶段四
                entity.setMotionY(currYmotion * 0.5)
                // event.server.tell("阶段四减速")
                entity.persistentData.putInt("forgiving", 4)
            }
            
            // return 继续后面的处理
        }

        /**forEach处理纸变纸浆 */
        // 太平庸了，改成吃纸获得纸浆
        // if (entity.type == "minecraft:item" && (level.isRaining() || level.isThundering()) && // 在下雨
        //     level.canSeeSky(entity.blockPosition().above()) &&
        //     entity.getNbt().Item.id == "minecraft:paper"
        // ) {
        //     // event.server.tell("检测到纸物品")
        //     // console.log(paper_nbt)
        //     // console.log(level.getBrightness("sky", entity.blockPosition()))
        //     if (Math.random() < 0.01) {
        //         let paper_nbt_item = entity.getNbt().Item
        //         // console.log(paper_nbt_item)
        //         entity.mergeNbt({Item:{id:paper_nbt_item.id, Count: paper_nbt_item.Count-1}})
        //         let pulpItem = level.createEntity('minecraft:item')
        //         pulpItem.mergeNbt({Item:{id:'create:pulp', Count:1}})
        //         pulpItem.setPosition(entity.getX(), entity.getY(), entity.getZ())
        //         pulpItem.spawn();
        //     }
        //     return
        // }

        /**forEach处理烟花实体 */
        if (entity.type == "minecraft:firework_rocket" && entity.getY() >= 256 &&
            level.getBlock(entity.blockPosition().above()).id == "supplementaries:wind_vane"
        ) {
            // event.server.tell("烟花抵达风向标")
            let firework_nbt = entity.getNbt()
            if (firework_nbt.Life < firework_nbt.LifeTime) return
            // event.server.tell("nbt检测通过")
            // event.server.tell(firework_explosions)

            // 先随机改天气，之后自会覆盖成特定的天气
            let random_weather = Math.random()
            if (random_weather > 2.0/3) {
                event.server.runCommandSilent("weather thunder");
            } else if (random_weather > 1.0/3) {
                event.server.runCommandSilent("weather rain");
            } else {
                event.server.runCommandSilent("weather clear");
            }
            firework_nbt.FireworksItem.tag.Fireworks.Explosions.forEach( explosion => { // 每个explosion对应一个烟火之星
                // event.server.tell(explosion.Colors[0])
                // console.log(explosion.Colors)
                explosion.Colors.forEach(color => {
                    if (color == 2437522) {
                        event.server.runCommandSilent("weather thunder");
                        // event.server.tell("weather thunder")
                        return
                    }
                    if (color == 6719955) {
                        event.server.runCommandSilent("weather rain");
                        // event.server.tell("weather rain")
                        return
                    }
                    // if (color == 11250603) { // 浅灰色
                    //     event.server.runCommandSilent("weather clear");
                    //     // event.server.tell("weather clear")
                    //     return
                    // }
                    if (color == 15790320) { // 白色
                        event.server.runCommandSilent("weather clear");
                        // event.server.tell("weather clear")
                        return
                    }
                })
            })
        } 
        
        /**forEach处理闪电实体 */
        if (entity.type == "minecraft:lightning_bolt" && entity.getBlockY() >= -61 && 
            !entity.persistentData.getBoolean("lava_triggered") &&
            (
                level.getBlock(entity.blockPosition().below().below()).id == "minecraft:magma_block" || 
                level.getBlock(entity.blockPosition().below().below()).id == "minecraft:cobblestone"
            ) &&
            level.getBlock(entity.blockPosition().below()).id == "minecraft:lightning_rod"
        ) {
            let entity_below2_block = level.getBlock(entity.blockPosition().below().below())
            let entity_below3_block = level.getBlock(entity.blockPosition().below().below().below())
            // event.server.tell("检测到闪电")
            // 概率岩浆块变岩浆
            if (
                entity_below2_block.id == "minecraft:magma_block" && entity_below3_block.id == "minecraft:cauldron"
            ) {
                entity_below2_block.set("air")
                if (Math.random() < 1.0/5) {entity_below3_block.set("lava_cauldron")}
            }
            // 概率圆石变岩浆块
            if (entity_below2_block.id == "minecraft:cobblestone" && Math.random() < 1.0/4){
                entity_below2_block.set("magma_block")
            }

            entity.persistentData.putBoolean("lava_triggered", true)
            level.spawnParticles('minecraft:lava', true, entity.getBlockX() + 0.5, entity.getBlockY() - 1.5, entity.getBlockZ() + 0.5, 0.2, 0.2, 0.2, 20, 1);
            return
        }
    })
})