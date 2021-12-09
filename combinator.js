

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


Array.prototype.getRdmElem = function (force = false) {
    res = this[Math.floor(Math.random() * this.length)]
    while (force && res == "")
        res = this[Math.floor(Math.random() * this.length)]

    return res
}


verbes = [
    "Tricoter",
    "Détricoter",
    "Coudre",
    "Découdre",
    "Recoudre",
    "Modéliser",
    "Compter",
    "Numériser",
    "Coder",
    "Encoder",
    "Décoder",
    "Déchiffer",
    "Broder",
    "Denteller",
    "Mesurer",
    "Visualiser"
]
choses = [
    "",
    "la mesure".fem(),
    "le symbole",
    "les données".fem().plur(),
    "la donnée",
    "l'élément",
    "les éléments".plur(),
    "l'information".fem(),
    "le modèle",
    "le point",
    "le tissu",
    "les flux".plur(),
    "le flux",
    "la relation".fem(),
    "le relationnel",
    "le fil",
    "le code",
    "le patterne",
    "les patternes".plur(),
    "les dimensions".fem().plur(),
    "la dimension",
    "la data".fem(),
    "les réalités".fem().plur(),
    "le réel",
    "le numérique",
    "l'art",
    "le graphe",
    "le réseau",
    "les réseaux".plur(),
    "le réseau",
    "l'esthétique",
    "l'esthétique relationnelle".fem(),
    "le capital relationnel",
    "le capital"
]

chose_coor = [
    "par",
    "pour"
]

adjectifs = [
    "",
    "relationnel".setVars("relationnelle", "relationnels", "relationnelles"),
    "complexe".setVars("complexe", "complexes", "complexes"),
    "abstrait".setVars("abstraite", "abstraits", "abstraites"),
    "informationnel".setVars("informationnelle", "informationnels", "informationnelles"),
    "numérique".setVars("numérique", "numériques", "numériques"),
    "mathématique".setVars("mathématique", "mathématiques", "mathématiques")
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
    chose_outil = chose_outil ?? choses.getRdmElem()
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
                        cb(`${verbe} ${chose} ${coordchose} ${chose_outil}`)
                    })
                })
                adjectifs.forEach(adjectif => {

                    chose_coor.forEach(coordchose => {

                        choses.forEach(chose_outil => {
                            cb(`${verbe} ${chose} ${adjectif} ${coordchose} ${chose_outil}`)
                        })
                    })

                    adjectifs.forEach(adjectif1 => {
                        if (adjectif == adjectif1)
                            return

                        chose_coor.forEach(coordchose => {

                            choses.forEach(chose_outil => {
                                cb(`${verbe} ${chose} ${adjectif} ${adjectif1} ${coordchose} ${chose_outil}`)
                                cb(`${verbe} ${chose} ${adjectif} ${coordchose} ${chose_outil} ${adjectif1} `)
                                cb(`${verbe} ${chose} ${coordchose} ${chose_outil}  ${adjectif} ${adjectif1} `)

                                coordination.forEach(coord => {
                                    cb(`${verbe} ${chose} ${adjectif} ${coord} ${adjectif1} ${coordchose} ${chose_outil}`)
                                })
                                coordination.forEach(coord => {
                                    cb(`${verbe} ${chose} ${coordchose} ${chose_outil}  ${adjectif} ${coord} ${adjectif1} `)
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