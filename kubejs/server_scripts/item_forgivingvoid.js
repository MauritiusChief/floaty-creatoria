
LevelEvents.tick(event => {
    const level = event.level;

    level.getEntities().forEach( entity => {
        if (entity.type != "minecraft:item") return;
        
        if (entity.getY() > -48) return;

        if (entity.persistentData.getBoolean("forgiving")) return;

        let currYmotion = entity.getMotionY()
        entity.setMotionY(currYmotion * 0.15)
        entity.mergeNbt({NoGravity: true})
        entity.persistentData.putBoolean("forgiving", true)
    })
})