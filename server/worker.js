var Pet = require('../data/database.js').Pet;

var lvl1 = {
  normal: "http://i.imgur.com/RzBy3Vw.gif",
  runaway: "http://i.imgur.com/JfH45R0.jpg",
  dead: "http://i.imgur.com/3tWT7qP.jpg",
  sick: "http://i.imgur.com/CdIG2m2.gif",
  happy: "http://i.imgur.com/jjUbQ6P.gif",
}

var lvl2 = {
  normal: 'http://i.giphy.com/3oriO8JJtEUpvOYm08.gif',
  runaway: 'http://i.giphy.com/l0HlyXWFwaJ942luo.gif',
  dead: 'http://i.giphy.com/3o6Ztqhekyhz1gsH0k.gif',
  sick: 'http://i.giphy.com/l0MYrEAYrIRmqoDVS.gif',
  happy: 'http://i.giphy.com/3o6ZtoD5DyQhBb9zTq.gif'
};

var urls = {
  lvl1: lvl1,
  lvl2: lvl2
}

module.exports = {
  poll: function() {
    Pet.findOne({}).then(function(pet) {  
    var level = pet.level    
      switch (pet.status) {
        case 'coding':
          pet.experience++;
          pet.feed--;
          pet.health--;
          break;
        case 'eating':
          pet.feed+=2;
          pet.health+=2;
          break;
        case 'playing':
          pet.health++;
          pet.love++;
          pet.feed--;
          break;
        case 'sleeping':
          pet.health++;
          pet.experience++;
          pet.feed--;
          break;
        default:
          pet.feed--;
          pet.health--;
          pet.love--;
          break;
      }
      //if dead, run only this
      if (pet.health < 0 || pet.feed < 0) {
        pet.status = 'dead';
        pet.phys = 'dead';
        pet.mood = 'dead';
        pet.img = urls['lvl' + level]['dead'];
        return pet.save();
      } 
      //check level before anything else
      if (pet.experience > 10) {
        pet.level = pet.level + 1;
        pet.experience = 0;
      }
      //then update values
      if (pet.health < 3) {
        pet.status = 'sick';
        pet.phys = 'sick';
        pet.mood = 'sad';
        pet.img = urls['lvl' + level]['sick'];
        return pet.save();
      } else if (pet.feed < 3) {
        pet.status = 'normal';
        pet.phys = 'hungry';
        pet.mood = 'grumpy';
        pet.img = urls['lvl' + level]['normal'];
        return pet.save();
      } else if (pet.health > 8) {
        pet.status = 'normal';
        pet.phys = 'healthy';
        pet.mood = 'feeling awesome';
        pet.img = urls['lvl' + level]['normal'];
        return pet.save();
      } else if (pet.feed > 8) {
        pet.status = 'sick';
        pet.phys = 'obese';
        pet.mood = 'bloated';
        pet.img = urls['lvl' + level]['sick'];
        return pet.save();
      } else if (pet.love > 8) {
        pet.status = 'happy';
        pet.phys = 'great';
        pet.mood = 'feeling loved';
        pet.img = urls['lvl' + level]['happy'];
        return pet.save();
      } else if (pet.love < 2) {
        pet.status = 'runaway';
        pet.phys = 'unknown';
        pet.mood = 'unknown';
        pet.img = urls['lvl' + level]['runaway'];
        return pet.save();
      } else {
        pet.status = 'normal';
        pet.mood = 'normal';
        pet.phys = 'normal';
        pet.img = urls['lvl' + level]['normal'];
        return pet.save();
      }
    }); 
  }
}