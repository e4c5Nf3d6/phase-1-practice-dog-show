document.addEventListener('DOMContentLoaded', () => {
    // Definitions
    const table = document.querySelector('#table-body')
    const form = document.querySelector('#dog-form')
    const nameInput = document.querySelector('[name = "name"]')
    const breedInput = form.querySelector('[name = "breed"]') 
    const sexInput = form.querySelector('[name = "sex"')
    let dogId

    // Load Dogs
    function loadDogs() {
        fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(data => {
            data.forEach(dog => {
                const tr = document.createElement('tr')
                tr.id = dog.id

                const name = document.createElement('td')
                name.textContent = dog.name
                tr.appendChild(name)

                const breed = document.createElement('td')
                breed.textContent = dog.breed
                tr.appendChild(breed)

                const sex = document.createElement('td')
                sex.textContent = dog.sex
                tr.appendChild(sex)

                const edit = document.createElement('td')
                const btn = document.createElement('button')
                btn.textContent = 'Edit Dog'
                btn.addEventListener('click', e => {
                    nameInput.value = dog.name
                    breedInput.value = dog.breed
                    sexInput.value = dog.sex

                    dogId = dog.id
                })
                edit.appendChild(btn)
                tr.appendChild(edit)

                table.appendChild(tr)
            })
        })
    }

    loadDogs()

    // Callbacks
    function editDog(e) {
        e.preventDefault()
        dogObj = {
            name: nameInput.value,
            breed: breedInput.value,
            sex: sexInput.value
        }

        form.reset()

        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dogObj)
        })
        .then(res => res.json())
        .then(() => {
            table.querySelectorAll('tr').forEach(row => row.remove())
            loadDogs()
        })
    }

    // Event Listeners
    form.addEventListener('submit', editDog)
})