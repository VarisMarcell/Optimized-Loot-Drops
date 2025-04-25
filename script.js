// Sam Tooley
// April 23, 2025

// This is the items with their weights in a nested list.
const minecraftWeights = [['stone', 15], ['iron', 12], ['gold', 8], ['diamond', 4], ['netherite', 1]];
// Number of keys
let keys = 5;

/* --- BASIC LOOT DROP --- */
// the items with higher weights will have more entries into the lootTable. For example, the rarest item would only be able to be chosen once, so a weight of 1. A common item like stone would be entered as many times as the weight; for example: 10 times.
function createBasicLootTable(weightedItems) {
    let lootTable = [];

    // Iterates through the weighted items and adds them to a loot table for as many times as their weight.
    for (let i = 0; i < weightedItems.length; i++) {
        for (let j = 0; j < weightedItems[i][1]; j++) {
            lootTable.push(weightedItems[i][0]);
        }
    }

    return lootTable;
}

// function to select one item from loot table at random
function selectLoot(lootTable) {
    let randomNumber = Math.floor(Math.random() * lootTable.length);
    return lootTable[randomNumber];
}
/* --- END BASIC LOOT DROP LOGIC --- */



/* --- OPTIMIZED LOOT DROP --- */
// the items weights are added together. We add up all weights and choose a random number between 1 and the weight total. We shuffle the items in the loot table and loop over it and subtract the weight of each asset from the random number we generated. When the difference is less than or equal to zero, the last asset is the one we choose.
function selectLootWithoutTable(weightedItems) {
    let totalWeight = 0;

    // add all the item weights together
    for (let i = 0; i < weightedItems.length; i++) {
        totalWeight += weightedItems[i][1];
    }

    // shuffle the item list
    let shuffled = [...weightedItems].sort(() => Math.random() - 0.5);

    // find a random number between 1 and the total weight of items
    let randomNumber = Math.floor((Math.random() * totalWeight) + 1);

    // loop over all items in list and subtract the weight of each item from the random number until the difference is less than or equal to zero.
    for (let i = 0; i < shuffled.length; i++) {
        randomNumber -= shuffled[i][1];
        if (randomNumber <= 0) {
            return shuffled[i][0];
        }
    }
}
/* --- END OPTIMIZED LOOT DROP LOGIC --- */



/* TESTING FUNCTIONS */
// define a basic loot table based off of our weight list 
let lootTableOne = createBasicLootTable(minecraftWeights);
// output our selected loot drop.
console.log(selectLoot(lootTableOne));

// select a loot drop using an optimized function
console.log(selectLootWithoutTable(minecraftWeights));



/* RUN THE CODE ON A WEBSITE */
// function to update the remaining keys in HTML
function updateKeyDisplay() {
    document.getElementById("keyCounter").textContent = `Keys: ${keys}`;
}

// function to run code on HTML button press
function openCrate() {
    if (keys <= 0) {
        alert("You don't have any keys!");
        return;
    }

    keys--;
    updateKeyDisplay();

    const spunItem = selectLootWithoutTable(minecraftWeights);
    const textElement = document.getElementById('spunItemText');

    if (textElement) {
        textElement.textContent = spunItem.toUpperCase();

        // remove all rarity classes
        textElement.classList.remove('common', 'uncommon', 'rare', 'mythic', 'legendary');

        // Apply correct rarity class
        switch (spunItem) {
            case 'stone':
                textElement.classList.add('common');
                break;
            case 'iron':
                textElement.classList.add('uncommon');
                break;
            case 'gold':
                textElement.classList.add('rare');
                break;
            case 'diamond':
                textElement.classList.add('mythic')
                break;
            case 'netherite':
                textElement.classList.add('legendary');
                break;
        }

        const chestCard = document.getElementById('chestCard');
        chestCard.classList.remove('legendary-glow');
        if (spunItem === 'netherite') {
            chestCard.classList.add('legendary-glow');
        }

        // retrigger animation
        textElement.style.animation = 'none';
        void textElement.offsetWidth;
        textElement.style.animation = 'popIn 0.3s ease forwards';
    }
}

// This runs on load to update the number of keys
updateKeyDisplay();

// This lets users purchase more keys if they run out
document.getElementById('buyKeyBtn').addEventListener('click', function() {
    keys++;
    updateKeyDisplay();
});

// Code to run get loot when a button is pressed
const button = document.getElementById("spinBtn");
button.addEventListener('click', openCrate);








