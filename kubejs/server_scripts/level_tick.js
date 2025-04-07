
LevelEvents.tick(event => {
    const level = event.level;

    level.getEntities().forEach( entity => {

        if ((entity.type == "minecraft:item" || entity.type == "minecraft:experience_orb") &&
            entity.getY() <= -48 && !entity.persistentData.getBoolean("forgiving")
        ) { // 物品和经验球不会落入虚空
            let currYmotion = entity.getMotionY()
            entity.setMotionY(currYmotion * 0.15)
            entity.mergeNbt({NoGravity: true})
            entity.persistentData.putBoolean("forgiving", true)


        } else if (entity.type == "minecraft:firework_rocket" && entity.getY() >= 256 &&
            level.getBlock(entity.getBlockX(), entity.getBlockY()+1, entity.getBlockZ()).id == "supplementaries:wind_vane"
        ) {
            // event.server.tell("烟花抵达风向标")
            let firework_nbt = entity.getNbt()
            if (firework_nbt.Life >= firework_nbt.LifeTime) {
                // event.server.tell("nbt检测通过")
                // event.server.tell(firework_explosions)
                firework_nbt.FireworksItem.tag.Fireworks.Explosions.forEach( explosion => { // 每个explosion对应一个烟火之星
                    // event.server.tell(explosion.Colors[0])
                    // console.log(explosion.Colors)
                    explosion.Colors.forEach(color => {
                        if (color == 2437522) {
                            event.server.runCommandSilent("weather thunder");
                            return
                        }
                        if (color == 6719955) {
                            event.server.runCommandSilent("weather rain");
                            return
                        }
                        if (color == 15790320) {
                            event.server.runCommandSilent("weather clear");
                            return
                        }

                    })
                })
                // 没有检测到针对性的颜色，则随机改天气
                let random_weather = Math.random()
                if (random_weather > 2.0/3) {
                    event.server.runCommandSilent("weather thunder");
                    return
                } else if (random_weather > 1.0/3) {
                    event.server.runCommandSilent("weather rain");
                    return
                } else {
                    event.server.runCommandSilent("weather clear");
                    return
                }
            }
            

        } else if (entity.type == "minecraft:lightning_bolt" && entity.getBlockY() >= -61 && 
            !entity.persistentData.getBoolean("lava_triggered") &&
            level.getBlock(entity.getBlockX(), entity.getBlockY()-1, entity.getBlockZ()).id == "minecraft:lightning_rod" &&
            level.getBlock(entity.getBlockX(), entity.getBlockY()-2, entity.getBlockZ()).id == "minecraft:cobblestone" &&
            level.getBlock(entity.getBlockX(), entity.getBlockY()-3, entity.getBlockZ()).id == "minecraft:cauldron"
        ) {
            // event.server.tell("检测到闪电")
            if (Math.random() < 1.0/3){
                level.getBlock(entity.getBlockX(), entity.getBlockY()-2, entity.getBlockZ()).set("air")
                level.getBlock(entity.getBlockX(), entity.getBlockY()-3, entity.getBlockZ()).set("lava_cauldron")
            }
            entity.persistentData.putBoolean("lava_triggered", true)

        }
    })
})