export default async (ctx, canvas, game, Listener, functions) => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let screenResize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))/150

    let screenElements = document.getElementById('screenElements')
    screenElements.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    let notUpdate = screenElements && !screenElements.getElementsByClassName('logoElement')[0]
    //try {
    let logoElement = screenElements.getElementsByClassName('logoElement')[0] || document.createElement('div')

    
    if (notUpdate) screenElements.innerHTML = ''
    logoElement.className = 'logoElement stage'

    let logoImage = document.getElementById('logoElement') || document.createElement('img')
    logoImage.id = 'logoImage'
    logoImage.src = 'https://alpha-site.vercel.app/imgs/avatar/Default.png'
    logoImage.style.position = 'absolute'
    logoImage.style.left = '50%'
    logoImage.style.top = '50%'
    logoImage.style.transform = 'translateX(-50%) translateY(-50%)'
    logoImage.style.height = screenResize*100+'px'

    let currentFrame = game.state.animations.logoAnimation.frame
    let endFrame = game.state.animations.logoAnimation.endFrame*0.9
    let alpha = currentFrame >= (endFrame-(endFrame*0.25)) ? (endFrame-currentFrame)/(endFrame-(endFrame-(endFrame*0.25))) : currentFrame/(endFrame*0.25)
    alpha = alpha >= 1 ? 1 : alpha <= 0 ? 0 : alpha

    logoImage.style.opacity = alpha
    logoElement.appendChild(logoImage)

    let logoText = document.getElementById('logoText') || document.createElement('div')
    logoText.id = 'logoText'
    logoText.innerText = 'Cogu'
    logoText.style.position = 'absolute'
    logoText.style.left = '50%'
    //logoText.style.top = `${58+(alpha*5)}%`
    logoText.style.top = canvas.height/2+(screenResize*58)+'px'
    logoText.style.transform = 'translateX(-50%) translateY(-50%)'
    logoText.style.fontSize = canvas.height*0.035+'px'//'22px'
    logoText.style.color = `hsl(${325-(alpha*50)}, 100%, 50%)`
    logoText.style.opacity = alpha*0.7
    logoElement.appendChild(logoText)


    screenElements.append(logoElement)
}
