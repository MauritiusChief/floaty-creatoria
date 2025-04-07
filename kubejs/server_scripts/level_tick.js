
LevelEvents.tick(event => {
    const level = event.level;

    level.getEntities().forEach( entity => {

        /**forEach处理掉物品和经验球掉虚空 */
        if ((entity.type == "minecraft:item" || entity.type == "minecraft:experience_orb") &&
            entity.getY() <= -48 && !entity.persistentData.getBoolean("forgiving")
        ) {
            // 物品和经验球不会落入虚空
            let currYmotion = entity.getMotionY()
            entity.setMotionY(currYmotion * 0.15)
            entity.mergeNbt({NoGravity: true})
            entity.persistentData.putBoolean("forgiving", true)
            return
        }

        /**forEach处理纸变纸浆 */
        if (entity.type == "minecraft:item" && (level.isRaining() || level.isThundering()) && // 在下雨
            level.canSeeSky(entity.blockPosition().above()) &&
            entity.getNbt().Item.id == "minecraft:paper"
        ) {
            // event.server.tell("检测到纸物品")
            // console.log(paper_nbt)
            // console.log(level.getBrightness("sky", entity.blockPosition()))
            if (Math.random() < 0.01) {
                let paper_nbt_item = entity.getNbt().Item
                // console.log(paper_nbt_item)
                entity.mergeNbt({Item:{id:paper_nbt_item.id, Count: paper_nbt_item.Count-1}})
                let pulpItem = level.createEntity('minecraft:item')
                pulpItem.mergeNbt({Item:{id:'create:pulp', Count:1}})
                pulpItem.setPosition(entity.getX(), entity.getY(), entity.getZ())
                pulpItem.spawn();
            }
            return
        }

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
                    if (color == 11250603) {
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
            level.getBlock(entity.blockPosition().below()).id == "minecraft:lightning_rod" &&
            level.getBlock(entity.blockPosition().below().below()).id == "minecraft:cobblestone" &&
            level.getBlock(entity.blockPosition().below().below().below()).id == "minecraft:cauldron"
        ) {
            // event.server.tell("检测到闪电")
            if (Math.random() < 1.0/3){
                level.getBlock(entity.blockPosition().below().below()).set("air")
                level.getBlock(entity.blockPosition().below().below().below()).set("lava_cauldron")
            }
            entity.persistentData.putBoolean("lava_triggered", true)
            level.spawnParticles('minecraft:lava', true, entity.getBlockX() + 0.5, entity.getBlockY() - 1.5, entity.getBlockZ() + 0.5, 0.2, 0.2, 0.2, 20, 1);
            return
        }
    })
})