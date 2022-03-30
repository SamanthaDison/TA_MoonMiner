console.log('quack')

let upgrades = {
    breadcrumbs: {
        price: 20,
        quantity: 0,
        multiplier: 1,
        type: 'click'
    },
    slicedGrapes: {
        price: 60,
        quantity: 0,
        multiplier: 2,
        type: 'click'
    },
    duckSnax: {
        price: 100,
        quantity: 0,
        multiplier: 5,
        type: 'click'
    },
    fish: {
        price: 100,
        quantity: 0,
        multiplier: 20,
        type: 'auto'
    },
    duckDuckJuice: {
        price: 5,
        quantity: 0,
        multiplier: 2,
        type: 'temp'
    }
}

let duckIt = 1

let quacks = 0

function draw() {
    for (const upgradeItem in upgrades) {
        let upgrade = upgrades[upgradeItem]
        document.getElementById(`${upgradeItem}`).innerText = upgrade.quantity.toString()
        document.getElementById(`${upgradeItem}Price`).innerText = upgrade.price.toString()
        document.getElementById(`${upgradeItem}Multiplier`).innerText = upgrade.multiplier.toString()
    }
    document.getElementById('quacks').innerText = quacks.toString()
}

// These old functions are abstracted out to the above draw function^^

// function drawQuacks() {
//     document.getElementById('quacks').innerText = quacks.toString()
// }

//     document.getElementById('breadcrumbs').innerText = upgrades.breadcrumbs.quantity.toString()
//     document.getElementById('slicedGrapes').innerText = upgrades.slicedGrapes.quantity.toString()
//     document.getElementById('duckSnax').innerText = upgrades.duckSnax.quantity.toString()
//     document.getElementById('fishinv').innerText = upgrades.fish.quantity.toString()
//     document.getElementById('duckDuckJuice').innerText = upgrades.duckDuckJuice.quantity.toString()
// }

// function drawStore() {
//     document.getElementById('breadcrumbsPrice').innerText = upgrades.breadcrumbs.price.toString()
//     document.getElementById('breadcrumbsMultiplier').innerText = upgrades.breadcrumbs.multiplier.toString()
//     document.getElementById('slicedGrapesPrice').innerText = upgrades.slicedGrapes.price.toString()
//     document.getElementById('slicedGrapesMultiplier').innerText = upgrades.slicedGrapes.multiplier.toString()
//     document.getElementById('duckSnaxPrice').innerText = upgrades.duckSnax.price.toString()
//     document.getElementById('duckSnaxMultiplier').innerText = upgrades.duckSnax.multiplier.toString()
//     document.getElementById('fishPrice').innerText = upgrades.fish.price.toString()
//     document.getElementById('fishMultiplier').innerText = upgrades.fish.multiplier.toString()
//     document.getElementById('duckDuckJuicePrice').innerText = upgrades.duckDuckJuice.price.toString()
//     document.getElementById('duckDuckJuiceMultiplier').innerText = upgrades.duckDuckJuice.multiplier.toString()
// }


function increaseQuacks() {
    quacks++
    console.log(quacks)
    document.getElementById('quackSound').play()
    let total = 0
    for (const upgradeItem in upgrades) {
        const upgrade = upgrades[upgradeItem]
        if (upgrade.quantity > 0 && upgrade.type == 'click') {
            total += upgrade.quantity * upgrade.multiplier
        }
    }
    quacks += total * duckIt
    draw()
}

function buyUpgrade(upgradeItem) {
    const upgrade = upgrades[upgradeItem]
    if (quacks >= upgrade.price) {
        upgrade.quantity += 1
        quacks -= upgrade.price
        upgrade.price += upgrade.price
    } else {
        window.alert('Not enough quacks bruh')
    }
    if (upgradeItem == 'fish') {
        addFish()
    }
    if (upgradeItem == 'duckDuckJuice') {
        addDuckDuckJuice()
    }
    draw()
}
function collectAutoUpgrades() {
    let totalQuacks = 0
    for (const upgradeItem in upgrades) {
        const upgrade = upgrades[upgradeItem]
        if (upgrade.quantity > 0 && upgrade.type == 'auto') {
            quacks += upgrade.quantity * upgrade.multiplier
            totalQuacks += upgrade.quantity * upgrade.multiplier
        }
    }
    document.getElementById('qps').innerText = totalQuacks.toString()
    draw()
}

function addFish() {
    let template = ''
    let direction = 'down'
    let speed = Math.floor(Math.random() * 12)
    for (let i = 1; i <= upgrades["fish"].quantity; i++) {
        console.log(speed);
        template += `
           <marquee behavior="alternate">
                <marquee behavior="alternate" direction="${direction}" scrollamount="${speed}">
                    <i class="fish">
                        🐠
                    </i>
                </marquee>
                </marquee>
            
`
        // switch (direction) {
        //     case 'down':
        //         direction = 'up'
        //         break;
        //     case 'up':
        //         direction = 'down'
        //         break;
        // }
    }
    document.getElementById('addFish').innerHTML = template
    console.log('fishies', upgrades.fish.quantity)

}

function addDuckDuckJuice() {
    duckIt++
    document.getElementById('addDuckDuckJuice').innerHTML =
        `<marquee behavior="alternate" direction="up" scrollamount="50">
        <i class="duck" onclick="increaseQuacks()">
            🦆
        </i>
    </marquee>`
    const myTimeout = setTimeout(clearDuckDuckJuice, 10000)
}

function clearDuckDuckJuice() {
    duckIt--
    document.getElementById('addDuckDuckJuice').innerHTML =
        `<marquee behavior="alternate" direction="up">
        <i class="duck" onclick="increaseQuacks()">
            🦆
        </i>
    </marquee>`

    clearTimeout()
}


setInterval(collectAutoUpgrades, 3000)
draw()

