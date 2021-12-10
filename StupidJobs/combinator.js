

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
String.prototype.getVars = function (fem, plur) {
    if (plur && fem)
        return this.varFemPlur ?? this
    if (fem)
        return this.varFem ?? this
    if (plur)
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
    
    str = this.replaceAt(0,"l")

    return str
}


Array.prototype.getRdmElem = function (force = false) {
    res = this[Math.floor(Math.random() * this.length)]
    while (force && res == "")
        res = this[Math.floor(Math.random() * this.length)]

    return res
}


verbes = [
    "Bricoleur",
    "Travailleur",
    "Collectioneur",
    "Fabriquant",
    "Marchant",
    "Réparateur",
    "Négociateur",
    "Valorisation",
    "Créateur",
    "Revendeur",
    "Administrateur",
    "Gestionnaire"
]
choses = [
    "d'industrie".fem(),
    "de software",
    "de bitcoin (cryptomonnaie)".setPas("la crypto".fem()),
    "de temps",
    "de ressources".fem().plur().setPas("les ressources".fem().plur()),
    "de ressource".fem().setPas("la ressource".fem()),
    "de valeur".fem().setPas("la valeur".fem()),
    "de signification".fem().setPas("la signification".fem()),
    "d'évènements".plur().setPas("l'évènementiel"),
    "de papier",
    "d'argent",
    "de végéteaux".setPas("le végétal"),
    "de code",
    "d'art",
    "de sourires".plur().setPas("les sourires"),
    "d'enfant".setPas("l'enfant"),
    "d'enfants".plur().setPas("les enfants"),
    "de personnes".fem().plur().setPas("les personnes".fem().plur()),
    "de personne".fem().setPas("la personne".fem()),
    "de rien",
    "de vent",
    "de vie".fem().setPas("la vie".fem()),
    "de conscience".fem(),
    "de bien-être"
]

chose_coor = [
    "par",
    "pour"
]

adjectifs = [
    "",
    "bovin".setVars("bovine", "bovins", "bovines"),
    "relationnel".setVars("relationnelle", "relationnels", "relationnelles"),
    "complexe".setVars("complexe", "complexes", "complexes"),
    "abstrait".setVars("abstraite", "abstraits", "abstraites"),
    "informationnel".setVars("informationnelle", "informationnels", "informationnelles"),
    "numérique".setVars("numérique", "numériques", "numériques"),
    "mathématique".setVars("mathématique", "mathématiques", "mathématiques"),
    "humain".setVars("humaine", "humains", "humaines"),
    "monnétaire".setVars("monnétaire", "monnétaires", "monnétaires"),
    "spirituel".setVars("spirituelle", "spirituels", "spirituelles"),
    "avancé".setVars("avancée", "avancés", "avancées"),
    "virtuel".setVars("virtuelle", "virtuels", "virtuelles")
]

coordination = [
    "ou",
    "et"
]

function getTemplate(verbe, chose, chose_outil, adjectif, adjectif1, coordchose, coord) {
    templates = []

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
            `${verbe} ${chose} ${adjectif.getVars(chose.isFem, chose.isPlur)}`,
        )

        if (chose_outil != "" && chose != chose_outil) {
            templates.push(
                `${verbe} ${chose} ${adjectif.getVars(chose.isFem, chose.isPlur)} ${coordchose} ${chose_outil}`,
            )
            if (adjectif1 != "" && adjectif != adjectif1) {
                templates.push(
                    `${verbe} ${chose} ${coordchose} ${chose_outil} ${adjectif.getVars(chose_outil.isFem, chose_outil.isPlur)} ${adjectif1.getVars(chose_outil.isFem, chose_outil.isPlur)} `,
                    `${verbe} ${chose} ${coordchose} ${chose_outil} ${adjectif.getVars(chose_outil.isFem, chose_outil.isPlur)} ${coord} ${adjectif1.getVars(chose_outil.isFem, chose_outil.isPlur)} `,
                    `${verbe} ${chose} ${adjectif.getVars(chose.isFem, chose.isPlur)} ${adjectif1.getVars(chose.isFem, chose.isPlur)} ${coordchose} ${chose_outil}`,
                    `${verbe} ${chose} ${adjectif.getVars(chose.isFem, chose.isPlur)} ${coordchose} ${chose_outil} ${adjectif1.getVars(chose_outil.isFem, chose_outil.isPlur)} `,
                    `${verbe} ${chose} ${adjectif.getVars(chose.isFem, chose.isPlur)} ${coord} ${adjectif1.getVars(chose.isFem, chose.isPlur)} ${coordchose} ${chose_outil}`
                )
            }
        }

        if (adjectif1 != "" && adjectif != adjectif1) {
            templates.push(
                `${verbe} ${chose} ${adjectif.getVars(chose.isFem, chose.isPlur)} ${adjectif1.getVars(chose.isFem, chose.isPlur)}`,
                `${verbe} ${chose} ${adjectif.getVars(chose.isFem, chose.isPlur)} ${coord} ${adjectif1.getVars(chose.isFem, chose.isPlur)} `,
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

function browseAllPossibilities(cb) {
    return new Promise(resolve => {
        verbes.forEach(verbe => {
            choses.forEach(chose => {
                choses.forEach(chose_outil => {
                    if (chose_outil == chose)
                        return
                    adjectifs.forEach(adjectif => {
                        adjectifs.forEach(adjectif1 => {
                            if (adjectif == adjectif1)
                                return
                            coordination.forEach(coord => {
                                chose_coor.forEach(coordchose => {
                                    templates = getTemplate(verbe, chose, chose_outil, adjectif, adjectif1, coordchose, coord)
                                    templates.forEach(p => cb(p))
                                })
                            })
                        })
                    })
                })
            })
        })
        resolve()
    })
}

function obselete_getNbElements(xv = 1, xc = 1, xcc = 1, xa = 1, xco = 1) {
    v = verbes.length * xv
    c = choses.length * xc
    cc = chose_coor.length * xcc
    a = adjectifs.length * xa
    co = coordination.length * xco

    return v * c * (cc * c + a * ((cc * c) + (a - 1) * (cc * c * (2 * co + 3) + 1 + co)))
}

function obselete_browseAllPossibilities(cb) {
    return new Promise(resolve => {
        verbes.forEach(verbe => {
            choses.forEach(chose => {

                chose_coor.forEach(coordchose => {

                    choses.forEach(chose_outil => {
                        cb(`${verbe} ${chose} ${coordchose} ${chose_outil.l()}`)
                    })
                })
                adjectifs.forEach(adjectif => {

                    chose_coor.forEach(coordchose => {

                        choses.forEach(chose_outil => {
                            cb(`${verbe} ${chose} ${adjectif} ${coordchose} ${chose_outil.l()}`)
                        })
                    })

                    adjectifs.forEach(adjectif1 => {
                        if (adjectif == adjectif1)
                            return

                        chose_coor.forEach(coordchose => {

                            choses.forEach(chose_outil => {
                                cb(`${verbe} ${chose} ${adjectif} ${adjectif1} ${coordchose} ${chose_outil.l()}`)
                                cb(`${verbe} ${chose} ${adjectif} ${coordchose} ${chose_outil.l()} ${adjectif1} `)
                                cb(`${verbe} ${chose} ${coordchose} ${chose_outil.l()}  ${adjectif} ${adjectif1} `)

                                coordination.forEach(coord => {
                                    cb(`${verbe} ${chose} ${adjectif} ${coord} ${adjectif1} ${coordchose} ${chose_outil.l()}`)
                                })
                                coordination.forEach(coord => {
                                    cb(`${verbe} ${chose} ${coordchose} ${chose_outil.l()}  ${adjectif} ${coord} ${adjectif1} `)
                                })
                            })
                        })

                        cb(`${verbe} ${chose} ${adjectif} ${adjectif1}`)
                        coordination.forEach(coord => {
                            cb(`${verbe} ${chose} ${adjectif} ${coord} ${adjectif1} `)
                        })
                    })
                })
            })
        })

        resolve()
    })
}