
StartupEvents.registry("item", (event) => {
    event.create("pebble").texture('havenpebbles:item/stone_pebble').displayName('小石子')
    // event.create("rotten_apple").parentModel('domesticationinnovation:item/rotten_apple').displayName('烂苹果')
    event.create("rotten_apple").texture('domesticationinnovation:item/rotten_apple').displayName('烂苹果')
})