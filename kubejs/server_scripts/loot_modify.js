LootJS.modifiers((event) => {
    event
        .addEntityLootModifier("minecraft:zombie")
        .matchMainHand("farmersdelight:iron_knife")
        .randomChanceWithLooting(0.1, 0.05)
        .addWeightedLoot([
            Item.of("minecraft:iron_ingot"),
            Item.of("minecraft:carrot"),
            Item.of("minecraft:potato")
        ]).matchEntity((entity) => {
            entity.isOnFire(true);
        })
        .functions(Item.of("minecraft:potato"), (f) => {
            f.smeltLoot();
        });;
});