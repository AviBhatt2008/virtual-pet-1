// define variables
var dogImg, happyDog;
var dog;
var foodStockRef, foodStock = 20;
var timer = 0;

function preload()
{
  // load images
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup()
{
  // create canvas
  createCanvas(500, 500);
  
  // create dog sprite and give normal dog image
  dog = createSprite(width/2 - 10, height/2 - 10, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  // refer to food in database
  database = firebase.database();
  foodStockRef = database.ref("food");
  foodStockRef.on("value", readStock);
}

function draw()
{  
  // make lime background
  background(rgb(46, 139, 87));

  // if the up key is pressed
  if(keyWentDown(UP_ARROW))
  {
    // if there is food left
    if(foodStock > 0)
    {
      // reduce stock by one and give dog happy image
      writeStock(foodStock);
      dog.addImage(happyDog);
    }
  }

  // if the foodStock is less than 1
  if(foodStock <= 0)
  {
    // display message
    fill("white");
    textSize(15);
    text("food has run out", width/2 - 70, height/2 - 100);
  }

  // display foodstock text
  textSize(15);
  fill("white");
  text("Food stock: " + foodStock, width - 100, 20);
  // display instructions text
  text("Press the up arrow to feed the dog!", width/2-140, 20);

  // every 150 frames
  if(frameCount % 150 === 0)
  {
    // give the dog the normal image (so happy image does not stay forever)
    dog.addImage(dogImg);
  }
  
  // draw sprites
  drawSprites();
}

// read the food value in database and assign to foodStock
function readStock(data)
{
  foodStock = data.val();
}

function writeStock(x)
{
  // subtract stock by 1
  foodStock -= 1;
  // update food in database
  database.ref("/").update(
    {
      food: x
    }
  )
}
