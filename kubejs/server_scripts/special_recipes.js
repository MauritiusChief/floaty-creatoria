
ServerEvents.recipes( event => {
    event.shaped('create:cardboard', [
		' D ',
		'SSS',
        ' D '
	], {
		S: 'create:pulp',
		D: '#minecraft:wooden_slabs'
	}).keepIngredient('#minecraft:wooden_slabs')
})