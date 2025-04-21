
ServerEvents.tags('item',  event => {
    event.add('forge:tools/knives', ['kubejs:zinc_knife', 'kubejs:copper_knife'])
    event.add('minecraft:stone_tool_materials', ['minecraft:flint'])
})

ServerEvents.tags('block',  event => {
    event.add('minecraft:moss_replaceable', ['minecraft:bone_block'])
})