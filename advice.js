let adviceCount = 0;

async function fetchAdvice() {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    return data.slip.advice;
}

function typeAdvice(text, element) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    type();
}

document.getElementById('diceContainer').addEventListener('click', async function() {
    const adviceTextElement = document.getElementById('adviceText');
    const adviceBox = document.getElementById('adviceBox');
    const adviceNumberElement = document.getElementById('adviceNumber');

    // Increase advice count
    adviceCount++;
    adviceNumberElement.textContent = adviceCount.toString().padStart(2, '0');

    // Fetch and display new advice with transition
    adviceBox.style.opacity = '0';
    adviceBox.style.transform = 'scale(0.9)';
    const advice = await fetchAdvice();
    setTimeout(() => {
        typeAdvice(advice, adviceTextElement);
        adviceBox.style.opacity = '1';
        adviceBox.style.transform = 'scale(1)';
    }, 500);
});