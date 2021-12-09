
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
    "la mesure",
    "le symbole",
    "les données",
    "la donnée",
    "l'élément",
    "les éléments",
    "l'information",
    "le modèle",
    "le point",
    "le tissu",
    "les flux",
    "le flux",
    "la relation",
    "le relationnel",
    "le fil",
    "le code",
    "le patterne",
    "les patternes",
    "les dimensions ",
    "la dimension",
    "la data",
    "les réalités",
    "le réel",
    "le numérique",
    "l'art",
    "le graphe",
    "le réseau",
    "les réseaux",
    "le réseau",
    "l'ésthétique relationnelle",
    "le capital relationnel"
]

chose_coor = [
    "par",
    "pour"
]

adjectifs = [
    "",
    "relationnel",
    "complexe",
    "abstraite",
    "informationnel",
    "numérique",
    "mathématique"
]

coordination = [
    "ou",
    "et"
]


function generateNewPhrase() {
    verbe = verbes.getRdmElem()
    chose = choses.getRdmElem()
    chose_outil = choses.getRdmElem()
    adjectif = adjectifs.getRdmElem()
    adjectif1 = adjectifs.getRdmElem()
    coordchose = chose_coor.getRdmElem()
    coord = coordination.getRdmElem()

    templates = [
        `${verbe} ${chose} ${coordchose} ${chose_outil}`,
        `${verbe} ${chose} ${adjectif} ${coordchose} ${chose_outil}`,
        `${verbe} ${chose} ${adjectif} ${adjectif1} ${coordchose} ${chose_outil}`,
        `${verbe} ${chose} ${adjectif} ${coordchose} ${chose_outil} ${adjectif1} `,
        `${verbe} ${chose} ${coordchose} ${chose_outil}  ${adjectif} ${adjectif1} `,
        `${verbe} ${chose} ${adjectif} ${coord} ${adjectif1} ${coordchose} ${chose_outil}`,
        `${verbe} ${chose} ${coordchose} ${chose_outil}  ${adjectif} ${coord} ${adjectif1} `,
        `${verbe} ${chose} ${adjectif} ${adjectif1}`,
        `${verbe} ${chose} ${adjectif} ${coord} ${adjectif1} `,
    ]

    //Don't care about repeating ourselves
    selected_phrase = templates.getRdmElem()

    return selected_phrase
}

function obselete_getNbElements(xv = 1, xc = 1, xcc = 1, xa = 1, xco = 1) {
    v = verbes.length * xv
    c = choses.length * xc
    cc = chose_coor.length * xcc
    a = adjectifs.length * xa
    co = coordination.length * xco

    return v * c * (cc * c + a * ((cc * c) + (a - 1) * (cc * c * (2 * co + 3) + 1 + co)))
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
                                    templates = [
                                        `${verbe} ${chose} ${coordchose} ${chose_outil}`,
                                        `${verbe} ${chose} ${adjectif} ${coordchose} ${chose_outil}`,
                                        `${verbe} ${chose} ${adjectif} ${adjectif1} ${coordchose} ${chose_outil}`,
                                        `${verbe} ${chose} ${adjectif} ${coordchose} ${chose_outil} ${adjectif1} `,
                                        `${verbe} ${chose} ${coordchose} ${chose_outil}  ${adjectif} ${adjectif1} `,
                                        `${verbe} ${chose} ${adjectif} ${coord} ${adjectif1} ${coordchose} ${chose_outil}`,
                                        `${verbe} ${chose} ${coordchose} ${chose_outil}  ${adjectif} ${coord} ${adjectif1} `,
                                        `${verbe} ${chose} ${adjectif} ${adjectif1}`,
                                        `${verbe} ${chose} ${adjectif} ${coord} ${adjectif1} `,
                                    ]
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

function obselete_browseAllPossibilities(cb) {
    return new Promise(resolve=>{
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

String.prototype.h = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

Array.prototype.getRdmElem = function () {
    return this[Math.floor(Math.random() * this.length)]
}
