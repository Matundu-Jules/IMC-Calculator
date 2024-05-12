const BMIData = [
    { name: 'Maigreur', color: '#A3D1FF', range: [0, 18.5] },
    { name: 'Poids normal', color: '#65DC97', range: [18.5, 25] },
    { name: 'Surpoids', color: '#FFC0CB', range: [25, 30] },
    { name: 'Obésité modérée', color: '#FFBB3D', range: [30, 35] },
    { name: 'Obésité sévère', color: '#F9BEC7', range: [35, 40] },
    { name: 'Obésité morbide', color: '#FFB8FF', range: 40 },
]

// IMC = poids en kg / taille² en m

// Récupération des éléments HTML
const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const displayBMI = document.querySelector('.bmi-value')
const result = document.querySelector('.result')

// Event : Soummision du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault()

    calculateBMI()
})

// Fonction pour calculer l'IMC
function calculateBMI() {
    const height = inputs[0].value
    const weight = inputs[1].value

    const inputsAreValid = verifyInputs(weight, height)

    if (!inputsAreValid) {
        console.error(
            'Veuillez saisir des valeurs valides pour le poids et la taille. \n\nLe poids doit être compris entre 1 kg et 300 kg, et la taille doit être comprise entre 1 cm et 250 cm.'
        )
        handleError()
        return
    }

    // prettier-ignore
    const BMI = (weight / ((height/100) ** 2)).toFixed(1)

    showResult(BMI)
}

// Fonction de vérification des valeurs des inputs
function verifyInputs(weight, height) {
    // Vérifier si les deux inputs ne sont pas vides
    if (weight === '' || height === '') {
        return false // Au moins un input est vide
    }

    // Vérifier si les valeurs sont réalistes
    if (
        weight <= 0 ||
        height <= 0 ||
        weight > 300 ||
        height > 250 ||
        !Number.isInteger(Number(weight)) ||
        !Number.isInteger(Number(height))
    ) {
        return false // Les valeurs ne reflètent pas la réalité ou ne sont pas des entiers
    }

    return true // Les deux inputs sont valides
}

function handleError() {
    displayBMI.textContent = 'Oups !'
    result.innerHTML =
        'Veuillez saisir des valeurs valides pour le poids et la taille. <br /> Le poids doit être compris entre 1 kg et 300 kg, et la taille doit être comprise entre 1 cm et 250 cm.'

    result.style.fontSize = '14px'
    result.style.color = '#FFC0CB'
    displayBMI.style.color = '#FFC0CB'
}

function showResult(BMI) {
    const rank = BMIData.find((data) => {
        if (BMI >= data.range[0] && BMI < data.range[1]) return data
        else if (typeof data.range === 'number' && BMI >= data.range)
            return data
    })

    displayBMI.textContent = BMI
    displayBMI.style.color = rank.color

    result.textContent = `Résultat : ${rank.name}`
    result.style.fontSize = '20px'
    result.style.color = '#f1f1f1'
}

// Fix scroll vertical sur mobile
const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', documentHeight)
documentHeight()
