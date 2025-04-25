// Sam Tooley
// April 25, 2025

// Verifying the probabilities of our optimized loot drop algorithm.
function verifyProbability() {
    let stoneCount = 0;
    let ironCount = 0;
    let goldCount = 0;
    let diamondCount = 0;
    let netheriteCount = 0;

    for (let i = 0; i < 100000; i++) {
        let item = selectLootWithoutTable(minecraftWeights);

        switch (item) {
            case 'stone':
                stoneCount++;
                break;
            case 'iron':
                ironCount++;
                break;
            case 'gold':
                goldCount++;
                break;
            case 'diamond':
                diamondCount++;
                break;
            case 'netherite':
                netheriteCount++;
                break;
        }
    }

    const probability = [['stone', stoneCount], ['iron', ironCount], ['gold', goldCount], ['diamond', diamondCount], ['netherite', netheriteCount]];
    return probability;
}

// console.log(verifyProbability());