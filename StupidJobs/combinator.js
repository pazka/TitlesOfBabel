

String.prototype.h = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

String.prototype.plur = function () {
    this.isPlur = true
    return this
}
String.prototype.fem = function () {
    this.isFem = true
    return this
}
String.prototype.getVars = function (obj) {
    if (obj.isPlur && obj.isFem)
        return this.varFemPlur ?? this
    if (obj.isFem)
        return this.varFem ?? this
    if (obj.isPlur)
        return this.varPlur ?? this

    return this
}

String.prototype.setVars = function (fem, plur, femPlur) {
    this.varFem = fem
    this.varPlur = plur
    this.varFemPlur = femPlur

    return this
}
String.prototype.setPas = function(passif){
    this.passif = passif
    return this
}

String.prototype.pas = function(){
    if(this.passif)
        return this.passif 
    
    let str = this.replaceAt(0,"l")

    return str
}


Array.prototype.getRdmElem = function (force = false) {
    let res = this[Math.floor(Math.random() * this.length)]
    while (force && res == "")
        res = this[Math.floor(Math.random() * this.length)]

    return res
}


let verbes = [
    "Bricoleur",
    "Travail",
    "Collectionneur",
    "Fabrication",
    "Marchand",
    "Réparation",
    "Préparation",
    "Négociation",
    "Valorisation",
    "Créateur",
    "Revendeur",
    "Administrateur",
    "Gestion",
    "Developpeur",
    "Organisation"
]
let choses = [
    "d'industrie".fem().setPas("l'industrie".fem()),
    "de #software",
    "de #bitcoin (cryptomonnaie)".setPas("la #crypto".fem()),
    "de #temps",
    "de ressources".fem().plur().setPas("les ressources".fem().plur()),
    "de ressource".fem().setPas("la ressource".fem()),
    "de #valeur".fem().setPas("la #valeur".fem()),
    "d'évènements".plur().setPas("l'évènementiel"),
    "de papier",
    "d'#argent",
    "de végétaux".plur().setPas("le #végétal"),
    "de #code",
    "d'#art",
    "de sourires".plur().setPas("les sourires"),
    "d'enfant".setPas("l'enfant"),
    "d'enfants".plur().setPas("les enfants"),
    "de personnes".fem().plur().setPas("les personnes".fem().plur()),
    "de personne".fem().setPas("la personne".fem()),
    "de rien",
    "de vent",
    "de film",
    "de commerce",
    "de #vie".fem().setPas("la #vie".fem()),
    "de #conscience".fem().setPas("la #conscience".fem()),
    "de #confiance".fem().setPas("la #confiance".fem()),
    "de bien-être",
    "de eCommerce",
    "de eAgriculture".fem(),
    "de nouvelles méthodes".fem().plur().setPas("les nouvelles méthodes".plur().fem()),
    "de chimie".fem().setPas("la chimie".fem()),
    "d'#amour",
    "de #jeux".plur(),
    "d'énergie".fem(),
    "de #voyage",
    "de développement"
]

let chose_coor = [
    "par",
    "pour"
]

let adjectifs = [
    "",
    "bovin".setVars("bovine", "bovins", "bovines"),
    "#vegan".setVars("vegan", "vegans", "vegans"),
    "animal".setVars("animale", "animals", "animales"),
    "relationnel".setVars("relationnelle", "relationnels", "relationnelles"),
    "complexe".setVars("complexe", "complexes", "complexes"),
    "abstrait".setVars("abstraite", "abstraits", "abstraites"),
    "#numérique".setVars("numérique", "numériques", "numériques"),
    "vidéo".setVars("vidéo", "vidéos", "vidéos"),
    "#humain".setVars("humaine", "humains", "humaines"),
    "monnétaire".setVars("monnétaire", "monnétaires", "monnétaires"),
    "spirituel".setVars("spirituelle", "spirituels", "spirituelles"),
    "avancé".setVars("avancée", "avancés", "avancées"),
    "#virtuel".setVars("virtuelle", "virtuels", "virtuelles"),
    "chimique".setVars("chimique", "chimiques", "chimiques"),
    "douteux".setVars("douteuse", "douteux", "douteuses"),
    "rural".setVars("rurale", "ruraux", "rurales"),
    "urbain".setVars("urbaine", "urbains", "urbaines"),
    "optimiste".setVars("optimiste", "optimistes", "optimistes"),
    "vert".setVars("verte", "verts", "vertes"),
    "#bio".setVars("bio", "bios", "bios"),
    "organique".setVars("organique", "organiques", "organiques"),
]

let coordination = [
    "ou",
    "et"
]

function getTemplate(verbe, chose, chose_outil, adjectif, adjectif1, coordchose, coord) {
    let templates = []

    if (chose == "")
        return []

    if (adjectif == "") {
        templates.push(
            `${verbe} ${chose}`,
        )

        if (chose_outil != "" && chose != chose_outil) {
            templates.push(
                `${verbe} ${chose} ${coordchose} ${chose_outil}`,
            )
        }
    } else {
        templates.push(
            `${verbe} ${chose} ${adjectif.getVars(chose)}`,
        )

        if (chose_outil != "" && chose != chose_outil) {
            templates.push(
                `${verbe} ${chose} ${adjectif.getVars(chose)} ${coordchose} ${chose_outil}`,
            )
            if (adjectif1 != "" && adjectif != adjectif1) {
                templates.push(
                    `${verbe} ${chose} ${coordchose} ${chose_outil} ${adjectif.getVars(chose_outil)} ${adjectif1.getVars(chose_outil)} `,
                    `${verbe} ${chose} ${coordchose} ${chose_outil} ${adjectif.getVars(chose_outil)} ${coord} ${adjectif1.getVars(chose_outil)} `,
                    `${verbe} ${chose} ${adjectif.getVars(chose)} ${adjectif1.getVars(chose)} ${coordchose} ${chose_outil}`,
                    `${verbe} ${chose} ${adjectif.getVars(chose)} ${coordchose} ${chose_outil} ${adjectif1.getVars(chose_outil)} `,
                    `${verbe} ${chose} ${adjectif.getVars(chose)} ${coord} ${adjectif1.getVars(chose)} ${coordchose} ${chose_outil}`
                )
            }
        }

        if (adjectif1 != "" && adjectif != adjectif1) {
            templates.push(
                `${verbe} ${chose} ${adjectif.getVars(chose)} ${adjectif1.getVars(chose)}`,
                `${verbe} ${chose} ${adjectif.getVars(chose)} ${coord} ${adjectif1.getVars(chose)} `,
            )
        }
    }
    return templates
}


function generateNewPhrase(verbe, chose, chose_outil, adjectif, adjectif1, coordchose, coord) {
    verbe = verbe ?? verbes.getRdmElem()
    chose = chose ?? choses.getRdmElem(force = true)
    chose_outil = chose_outil ?? choses.getRdmElem().pas()
    adjectif = adjectif ?? adjectifs.getRdmElem()
    adjectif1 = adjectif1 ?? adjectifs.getRdmElem()
    coordchose = coordchose ?? chose_coor.getRdmElem()
    coord = coord ?? coordination.getRdmElem()

    templates = getTemplate(verbe, chose, chose_outil, adjectif, adjectif1, coordchose, coord)

    //Don't care about repeating ourselves
    selected_phrase = templates.getRdmElem()

    return selected_phrase
}

if(typeof module != "undefined"){
    module.exports = {
        generateNewPhrase : generateNewPhrase
    }
}
if(typeof exports != "undefined"){
    exports = {
        generateNewPhrase : generateNewPhrase
    }
}
