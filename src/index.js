const dogBar = document.querySelector('div#dog-bar');
const dogInfo = document.querySelector('div#dog-info');

fetch('http://localhost:3000/pups')
.then(r => r.json())
.then(doggos => doggos.forEach(dog => {
    const span = document.createElement('span');
    

    span.innerHTML = dog.name;
    
    dogBar.append(span);

    span.addEventListener('click', e => {
        renderDoggo(dog)
    })

}))


function renderDoggo(dog) {
    const image = document.createElement('img');
    const name = document.createElement('h2');
    const btn = document.createElement('button');
    console.log(dog)
    dogInfo.innerHTML = ""

        image.src = dog.image;
        name.textContent = dog.name
                
        dogInfo.append(image, name)

        if(dog.isGoodDog === true) {
            btn.textContent = 'Good Dog!'
            dogInfo.append(btn)
            btn.addEventListener('click', () => {
                handleDoggo(dog)
            })
        } else {
            btn.textContent = 'Bad Dog!'
            dogInfo.append(btn)
            btn.addEventListener('click', () => {
                handleDoggo(dog)
            })
        }
            
}

function handleDoggo(dog) {
    
    if(dog.isGoodDog === true){
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isGoodDog: false
            })
        })
        .then(r => r.json())
        .then(dog => {
            renderDoggo(dog)
        })
        
    } else {
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isGoodDog: true
            })
        })
        .then(r => r.json())
        .then(dog => {
            renderDoggo(dog)
        })
        
    }
}
