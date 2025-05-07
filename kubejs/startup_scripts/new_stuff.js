
StartupEvents.registry("item", (event) => {
    event.create("pebble").texture('havenpebbles:item/stone_pebble')
    // event.create("rotten_apple").parentModel('domesticationinnovation:item/rotten_apple').displayName('烂苹果')
    event.create("rotten_apple").texture('domesticationinnovation:item/rotten_apple')
    event.create("huigu_material")
    event.create("huigu_alloy")

    event.create('zinc_knife', 'farmersdelight:knife').tier('iron')
    event.create('copper_knife', 'farmersdelight:knife').tier('gold')

    const discs = ["11", "13", "blocks", "cat", "chirp", "far", "mall", "mellohi", "stal", "strad", "wait", "ward"]
    discs.forEach( disc => {
        event.create(`proto_frame_${disc}`).texture(`kubejs:block/proto_frame/frame_top_${disc}`).unstackable().rarity('RARE')
        event.create(`filled_frame_${disc}`).modelJson({
            "parent": "minecraft:block/block",
            "textures": {
                "particle": "minecraft:block/end_portal_frame_side",
                "bottom": "minecraft:block/end_stone",
                "top": `kubejs:block/proto_frame/frame_top_${disc}`,
                "side": "minecraft:block/end_portal_frame_side"
            },
            "elements": [
                {   "from": [ 0, 0, 0 ],
                    "to": [ 16, 13, 16 ],
                    "faces": {
                        "down":  { "uv": [ 0, 0, 16, 16 ], "texture": "#bottom", "cullface": "down" },
                        "up":    { "uv": [ 0, 0, 16, 16 ], "texture": "#top" },
                        "north": { "uv": [ 0, 3, 16, 16 ], "texture": "#side", "cullface": "north" },
                        "south": { "uv": [ 0, 3, 16, 16 ], "texture": "#side", "cullface": "south" },
                        "west":  { "uv": [ 0, 3, 16, 16 ], "texture": "#side", "cullface": "west" },
                        "east":  { "uv": [ 0, 3, 16, 16 ], "texture": "#side", "cullface": "east" }
                    }
                }
            ]
        }).unstackable().rarity('EPIC').glow(true)
    })
})