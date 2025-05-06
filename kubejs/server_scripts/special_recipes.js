
ServerEvents.recipes( event => {
    event.shaped('create:cardboard', [
		' D ',
		'SSS',
        ' D '
	], {
		S: 'create:pulp',
		D: '#minecraft:wooden_slabs'
	}).keepIngredient('#minecraft:wooden_slabs')

	['create:chocolate_bucket']
	const discs = ["11", "13", "blocks", "cat", "chirp", "far", "mall", "mellohi", "stal", "strad", "wait", "ward"]
	const disc_ingre = {"11": 'minecraft:tinted_glass', "13": 'minecraft:sea_lantern', "blocks": 'minecraft:magma_block', "cat": 'minecraft:charcoal', "chirp": 'minecraft:shulker_box', "far": 'supplementaries:jar_boat', "mall": 'minecraft:blue_ice', "mellohi": 'minecraft:shulker_box', "stal": 'minecraft:mud_bricks', "strad": 'create:brass_block', "wait": "create:chocolate", "ward": 'create:electron_tube'}
	discs.forEach( disc => {
		event.custom({
			"type": "create:mechanical_crafting",
			"key": {
				"A": {
					"item": "minecraft:end_stone"
				},
				"B": {
					"item": "minecraft:ender_pearl"
				},
				"P": {
					"item": "minecraft:respawn_anchor"
				},
				"S": {
					"item": `minecraft:music_disc_${disc}`
				}
			},
			"pattern": [
				" AAA ",
				"ABPBA",
				"APSPA",
				"ABPBA",
				" AAA "
			],
			"result": {
			  	"item": `kubejs:proto_frame_${disc}`
			}
		}).id(`floatcre:crafting_proto_frame_${disc}`)

		let customRecipe = {
			"type": "create:sequenced_assembly",
			"ingredient": {
				"item": `kubejs:proto_frame_${disc}`
			},
			"loops": 2048,
			"transitionalItem": {
				"item": `kubejs:proto_frame_${disc}`
			},
			"results": [
				{
					"item": `kubejs:filled_frame_${disc}`
				}
			],
		}
		if (disc == "wait") { // wait 唱片是注液巧克力，不是放置
			customRecipe["sequence"] = [{
				"type": "create:filling",
				"ingredients": [
					{"item": `kubejs:proto_frame_${disc}`},
					{"amount": 1000, "fluid": disc_ingre[disc], "nbt": {}}
				],
				"results": [
					{"item": `kubejs:proto_frame_${disc}`}
				]
			}]
		} else {
			customRecipe["sequence"] = [{
				"type": "create:deploying",
				"ingredients": [
					{"item": `kubejs:proto_frame_${disc}`},
					{"item": disc_ingre[disc]}
				],
				"results": [
					{"item": `kubejs:proto_frame_${disc}`}
				]
			}]
		}
		customRecipe["sequence"].push({
			"type": "create:cutting",
			"ingredients": [
				{"item": `kubejs:proto_frame_${disc}`}
			],
			"processingTime": 1000,
			"results": [
				{"item": `kubejs:proto_frame_${disc}`}
			]
		})
		customRecipe["sequence"].push({
			"type": "create:pressing",
			"ingredients": [
				{"item": `kubejs:proto_frame_${disc}`}
			],
			"results": [
				{"item": `kubejs:proto_frame_${disc}`}
			]
		})
		

		event.custom(customRecipe).id(`floatcre:filling_frame_${disc}`)
		
	})
})