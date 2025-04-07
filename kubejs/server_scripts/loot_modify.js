// LootJS.modifiers((event) => {
//     event.addEntityLootModifier("minecraft:zombie")
//         .matchMainHand("farmersdelight:iron_knife")
//         .randomChanceWithLooting(0.1, 0.05)
//         .addWeightedLoot([
//             Item.of("minecraft:iron_ingot"),
//             Item.of("minecraft:carrot"),
//             Item.of("minecraft:potato")
//         ]).matchEntity((entity) => {
//             entity.isOnFire(true);
//         })
//         .functions(Item.of("minecraft:potato"), (f) => {
//             f.smeltLoot();
//         });

//     // 迷之原因，修改不成功
//     // event.addLootTableModifier("minecraft:gameplay/fishing")

//     event.addLootTableModifier("minecraft:gameplay/fishing/junk")
//         .addLoot("minecraft:gravel");

//     event.addLootTableModifier("minecraft:gameplay/fishing/fish")
//         .removeLoot(ItemFilter.ALWAYS_TRUE)
//         .addLoot("minecraft:gold_ingot");
//         // .removeLoot(ItemFilter.ALWAYS_TRUE)

//     event.addLootTableModifier("minecraft:gameplay/fishing/treasure")
//         .removeLoot(ItemFilter.ALWAYS_TRUE)
//         .addLoot("minecraft:diamond");
//         // .removeLoot(ItemFilter.ALWAYS_TRUE)
// });
