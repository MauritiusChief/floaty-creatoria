
ServerEvents.recipes( event => {
    event.shaped('create:cardboard', [
		' D ',
		'SSS',
        ' D '
	], {
		S: 'create:pulp',
		D: '#minecraft:wooden_slabs'
	}).keepIngredient('#minecraft:wooden_slabs')

	// const discs = ["11", "13", "blocks", "cat", "chirp", "far", "mall", "mellohi", "stal", "strad", "wait", "ward"]
	// discs.forEach( disc => {
	// 	event.shaped(`kubejs:proto_frame_${disc}`, )
	// })
})