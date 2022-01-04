function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

var itemCats = ['helmet', 'crown', 'armor', 'clothes', 'weapon', 'lighter', 'purse', 'potion', 'spell', 'food'];

var itemLimits = [
	{ slot: 'head', limit: 1, types: ['helmet', 'crown'] },
	{ slot: 'body', limit: 1, types: ['armor', 'clothes'] },
	{ slot: 'hands', limit: 2, types: ['weapon', 'lighter'] },
	{ slot: 'belt', limit: 3, types: ['weapon', 'purse'] },
	{ slot: 'bag', limit: 10, types: ['helmet', 'crown', 'clothes', 'lighter', 'potion', 'spell', 'food', 'purse'] }
];


class Item {
	static counter = 0;
	constructor(name, type, price, effect) {
		Item.counter++;
		this.id = Item.counter
		this.name = name
		// test si le type donné en param est valide
		if (itemCats.includes(type)) {
			this.type = type
		}
		else {
			this.type = ''
		}
		if (price >= 0) {
			this.price = price
		}
		else {
			this.price = 0
		}
		this.effect = effect
	}
	static fromJSON(obj) {
		let it = new Item(obj.name, obj.type, obj.price, obj.effect)
		it.id = obj.id
		return it
	}
}

var items = [
	new Item('conic helmet', 'helmet', 200, 'A+10'),
	new Item('great crown of apologia', 'crown', 200, 'A+20'),
	new Item('band of joy', 'crown', 100, 'L+10'),
	new Item('leather armor', 'armor', 100, 'A+10'),
	new Item('broigne', 'armor', 200, 'A+20'),
	new Item('hauberk', 'armor', 500, 'A+40'),
	new Item('plate armor', 'armor', 1000, 'A+60'),
	new Item('tuxedo', 'clothes', 600, 'L+1'),
	new Item('cursed swimsuit', 'clothes', 10, 'A-10'),
	new Item('unicorn cosplay', 'clothes', 200, 'L+10'),
	new Item('dagger', 'weapon', 100, 'S+5'),
	new Item('cursed dagger', 'weapon', 100, 'S-5'),
	new Item('short sword', 'weapon', 200, 'S+10'),
	new Item('cursed short sword', 'weapon', 200, 'S-10'),
	new Item('long sword', 'weapon', 300, 'S+20'),
	new Item('cursed long sword', 'weapon', 300, 'S-20'),
	new Item('axe', 'weapon', 100, 'S+10'),
	new Item('cursed axe', 'weapon', 100, 'S-10'),
	new Item('great axe', 'weapon', 200, 'S+20'),
	new Item('cursed great axe', 'weapon', 200, 'S-20'),
	new Item('torch', 'lighter', 2, ''),
	new Item('oil lamp', 'lighter', 10, ''),
	new Item('leather purse', 'purse', 10, ''),
	new Item('protection potion', 'potion', 100, 'a+10'),
	new Item('health potion', 'potion', 100, 'l+10'),
	new Item('strength potion', 'potion', 100, 's+10'),
	new Item('fireball', 'spell', 1000, ''),
	new Item('ice cone', 'spell', 1000, ''),
	new Item('total healing', 'spell', 1000, ''),
	new Item('invisibility', 'spell', 1000, ''),
	new Item('levitation', 'spell', 1000, ''),
	new Item('apple', 'food', 1, 'l+1'),
	new Item('chicken', 'food', 10, 'l+5'),
	new Item('beef', 'food', 15, 'l+10'),
	new Item('wine', 'food', 2, 'l+2')
];

class Shop {
	static counter = 0;
	constructor(name, itemCat) {
		Shop.counter++;
		this.id = Shop.counter;
		this.name = name;
		this.itemCat = [...itemCat];
		this.itemStock = [];
		this.itemOrder = [];
		this.fillStock();
		this.fillOrder();
	}
	fillStock() {
		let tab = []
		// fill tab with items matching the store categories
		tab = items.filter(e => this.itemCat.includes(e.type))
		/* ALTERNATE POSSIBILITY with a forEach :
		   items.forEach(e => {
		   if (this.itemCat.includes(e.type)) tab.push(e)
		   });
		*/

		// pick 10 at random, may lead to several occurences of the same item
		for (let i = 0; i < 10; i++) {
			let idx = getRandomInt(tab.length)
			this.itemStock.push(tab[idx])
		}
	}
	fillOrder() {
		let tab = []
		// fill tab with items macthing the store cat + not in itemStock
		items.forEach(e => {
			if (this.itemCat.includes(e.type)) {
				// check if e is already in itemStock or not
				let isStock = false;
				for (let i = 0; i < this.itemStock.length; i++) {
					if (this.itemStock[i].name === e.name) {
						isStock = true;
						break;
					}
				}
				if (!isStock) tab.push(e)
			}
		});
		// get 5 different items at random => need to remove chosen in tab
		for (let i = 0; i < 5; i++) {
			let idx = getRandomInt(tab.length)
			this.itemOrder.push(tab[idx])
			tab.splice(idx, 1)
			// stop choosing if there are no more items
			if (tab.length === 0) break;
		}
	}
	// estimate the rebuy price of an item
	// if wrong items type return -1
	estimate(item) {
		if (!this.itemCat.includes(item.type)) return -1
		// the discount on the rebuy price varies from 0 to 90% of original price
		// means that the rebuy price varies from 10 to 100% of the original
		let r = getRandomInt(91)
		return item.price * (10.0 + r) / 100.0
	}
	// buy an item from the current player
	buy(item) {
		this.itemStock.push(item)
	}
	// sell an item to the current player
	sell(id) {
		this.itemStock.splice(id, 1)
	}
	// order an item
	order(id) {
		this.itemStock.push(this.itemOrder[id]);
	}
	static fromJSON(obj) {
		let s = new Shop(obj.name, obj.itemCat)
		s.id = obj.id
		return s;
	}
}

class Street {
	static counter = 0;
	constructor(name) {
		Street.counter++;
		this.id = Street.counter;
		this.name = name;
		this.shops = [];
	}
	addShop(shop) {
		this.shops.push(shop);
	}
	static fromJSON(obj) {
		let s = new Street(obj.name)
		s.id = obj.id
		obj.shops.forEach(shop => s.shops.push(Shop.fromJSON(shop)))
		return s;
	}
}

class Town {
	static counter = 0;
	constructor(name) {
		Town.counter++;
		this.id = Town.counter;
		this.name = name;
		this.streets = [];
	}
	addStreet(street) {
		this.streets.push(street);
	}
	static fromJSON(obj) {
		let t = new Town(obj.name)
		t.id = obj.id
		obj.streets.forEach(street => t.streets.push(Street.fromJSON(street)))
		return t;
	}
}

let cat1 = ['helmet', 'armor', 'weapon'];
let cat2 = ['clothes', 'purse', 'food', 'lighter'];
let cat3 = ['crown', 'spell', 'potion'];

let shop1 = new Shop("Patty Smith", cat1);
//let shop2 = new Shop("I smith you", cat1);
let shop3 = new Shop("Dingue de marteau", cat1);
let street1 = new Street("Smith Street");
street1.addShop(shop1);
street1.addShop(shop3);

let shop4 = new Shop("My tailor is rich", cat2);
let shop5 = new Shop("La grosse Erie", cat2);
let shop6 = new Shop("Les Zoeurs", cat2);
let street2 = new Street("Quality Street");
street2.addShop(shop4);
street2.addShop(shop5);
street2.addShop(shop6);

let shop7 = new Shop("Wizzz", cat3);
let shop8 = new Shop("A Bric-a-brac dabra", cat3);
//let shop9 = new Shop("La bonne baguette", cat3);
let street3 = new Street("Magic Street");
street3.addShop(shop7);
street3.addShop(shop8);

let street4 = new Street("Rue 4");
street4.addShop(shop1);
street4.addShop(shop6);
street4.addShop(shop4);

let street5 = new Street("Rue 5");
street5.addShop(shop3);
street5.addShop(shop5);


let street6 = new Street("Rue 6");
street6.addShop(shop1);



class Slot {

	constructor(id, name) {
		this.id = id
		this.name = name
		this.items = []
	}
	static fromJSON(obj) {
		let s = new Slot(obj.id, obj.name)
		obj.items.forEach(it => s.items.push(Item.fromJSON(it)))
		return s
	}
}

class Perso {

	static counter = 0;
	constructor(name, level) {
		Perso.counter++;
		this.id = Perso.counter;
		this.name = name;
		this.level = level;
		this.slots = [];
		this.slots.push(new Slot(1, 'head'))
		this.slots.push(new Slot(2, 'body'))
		this.slots.push(new Slot(3, 'hands'))
		this.slots.push(new Slot(4, 'belt'))
		this.slots.push(new Slot(5, 'bag'))
		this.boughtItems = []; // list of item bought but not yet assigned

		this.vitality = this.level * 50
		this.life = this.vitality
		this.strength = this.level * 20
		this.armor = 0
		this.gold = 450
	}


	buy(item) {
		if (item.price > this.gold) return "Pas assez d'or"
		this.boughtItems.push(item);
		this.gold -= item.price
		return ""
	}

	assign(boughtItemIndex, slotIndex) {
		let item = this.boughtItems[boughtItemIndex]
		// find which limits corresponds to the target slot
		if (item === undefined) return "Les numéros données ne correspondent à aucun objet équipé";
		if (this.slots[slotIndex] === undefined) return "Le numéro de l'espace donnée n'est pas disponible (choix entre 1 et 5 inclu)"
		let lim = itemLimits.find(e => e.slot === this.slots[slotIndex].name)
		// check if item number is already reached
		if (this.slots[slotIndex].items.length === lim.limit) return "Espace " + this.slots[slotIndex].name + " est rempli"
		// check if item type is allowed
		if (!lim.types.includes(item.type)) return "Mauvais type d'objet [" + item.type + "] pour l'espace " + this.slots[slotIndex].name
		this.boughtItems.splice(boughtItemIndex, 1);
		this.slots[slotIndex].items.push(item);
		this.maintenanceStatEquip();
		return ""
	}

	desassign(itemEquipedIndex, slotIndex) {
		let item = this.slots[slotIndex].items[itemEquipedIndex];
		if (item === undefined) return "Les indices données ne correspondent à aucun objet équipé";
		// find which limits corresponds to the target slot
		this.boughtItems.push(item);
		this.slots[slotIndex].items.splice(itemEquipedIndex, 1);
		this.maintenanceStatDesequip(item)

		return ""
	}

	sell(slotIndex, itemIndex, price) {
		this.maintenanceStatDesequip(this.slots[slotIndex].items[itemIndex]);
		this.slots[slotIndex].items.splice(itemIndex, 1)
		this.gold += price
	}

	maintenanceStatEquip(){ // permet de modifier les stat avec les bonus-malus des equipements lorsqu'on les equipent
		this.slots.forEach((slot) => { 
			slot.items.forEach((item) => {
				let effet = item.effect[1]
				let bonus = item.effect.split(effet)[1] // on recupere la partie a droite du " + " ou " - " 
				if (item.effect.includes("A")){ // bonus d'armure 
					this.armor+= parseInt(effet + bonus)
				}
				if (item.effect.includes("l")){ // bonus vie
					//this.life+= parseInt(effet + bonus) // on ne fait rien car lettre minuscule, on laisse la condition presente si on en a besoin ulterieurement
				}
				if (item.effect.includes("L")){ // bonus vitality
					this.vitality+= parseInt(effet + bonus)
				}
				if (item.effect.includes("S")){
					this.strength+= parseInt(effet + bonus)
				}
			})
		})
	}

	maintenanceStatDesequip(item){ // permet de faire revenir les stats a la normales lorsque l'on vend un item
		let effet = item.effect[1]
		let bonus = item.effect.split(effet)[1] // on recupere la partie a droite du " + " ou " - "  
 
		if (item.effect.includes("A")){ // bonus d'armure 
			this.armor-= parseInt(effet + bonus)
		}
		if (item.effect.includes("l")){ // bonus vie
			//this.life-= parseInt(effet + bonus)  // on ne fait rien car lettre minuscule, on laisse la condition presente si on en a besoin ulterieurement
		}
		if (item.effect.includes("L")){ // bonus vitality
			this.vitality-= parseInt(effet + bonus)
		}
		if (item.effect.includes("S")){ // bonus force
			this.strength-= parseInt(effet + bonus)
		}
	}

	static fromJSON(obj) {
		let p = new Perso(obj.name, obj.level)
		p.id = obj.id
		p.gold = obj.gold
		p.life = obj.life
		p.vitality = obj.vitality
		p.strength = obj.strength
		p.armor = obj.armor
		p.slots.splice(0)
		obj.slots.forEach(slot => p.slots.push(Slot.fromJSON(slot)))
		p.boughtItems.splice(0)
		// POSSIBLE ALTERNATIVE: use map() instead of forEach to assign bouthItems
		p.boughtItems = obj.boughtItems.map(it => Item.fromJSON(it))
		return p
	}
}


let town1 = new Town("Ville 1");
town1.addStreet(street1);


let town2 = new Town("Ville 2");
town2.addStreet(street1);
town2.addStreet(street5);
town2.addStreet(street4);
town2.addStreet(street3);

let town3 = new Town("Ville 3");
town3.addStreet(street3);
town3.addStreet(street6);
town3.addStreet(street5);

let towns = [town1, town2, town3];

var team = [
	new Perso("Perso1", 1), new Perso("Perso2", 2), new Perso("Perso3", 3), new Perso("Perso4", 4)
];

export { towns, team }