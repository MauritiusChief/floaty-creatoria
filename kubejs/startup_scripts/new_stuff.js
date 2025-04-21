
StartupEvents.registry("item", (event) => {
    event.create("pebble").texture('havenpebbles:item/stone_pebble').displayName('小石子')
    // event.create("rotten_apple").parentModel('domesticationinnovation:item/rotten_apple').displayName('烂苹果')
    event.create("rotten_apple").texture('domesticationinnovation:item/rotten_apple').displayName('烂苹果')
    event.create("huigu_material").displayName('灰骨粘质')
    event.create("huigu_alloy").displayName('灰色合金')

    event.create('zinc_knife', 'farmersdelight:knife').displayName('锌刀').tier('gold')
    event.create('copper_knife', 'farmersdelight:knife').parentModel('kubejs:item/copper_knife').displayName('铜刀').tier('gold')
})