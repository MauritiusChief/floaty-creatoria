
ItemEvents.modification(event => {
  event.modify('minecraft:paper', item => {
    item.foodProperties = food => {
        food.hunger(0)
        food.saturation(0)
        food.alwaysEdible()
    }
  })
})