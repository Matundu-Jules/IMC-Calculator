const BMIData = [
    { name: 'Maigreur', color: '#001F3F', range: [0, 18.5] },
    { name: 'Poids normal', color: '#2ECC71', range: [18.5, 25] },
    { name: 'Surpoids', color: '#FFC0CB', range: [25, 30] },
    { name: 'Obésité modérée', color: '#FFA500', range: [30, 35] },
    { name: 'Obésité sévère', color: '#DC143C', range: [35, 40] },
    { name: 'Obésité morbide', color: '#800080', range: [40] },
]

// IMC = poids en kg / taille² en m

// Récupération des éléments HTML
const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')

// Event : Soummision du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const bmi = calculateBMI(inputs)
    console.log('IMC = ', bmi)
})

// Fonction pour calculer l'IMC
function calculateBMI(inputs) {
    const height = inputs[0].value
    const weight = inputs[1].value

    console.log(height, weight)

    // prettier-ignore
    return (weight / ((height/100) ** 2)).toFixed(2)
}
