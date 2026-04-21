//send feedback
document.getElementById('sendFeedback').addEventListener('click', async () => {
    const feedback = document.getElementById('feedback').value;

    if (!feedback.trim()){
        alert('Bitte etwas eingeben');
        return;
    }

    await fetch('https://formspree.io/f/xpqkjdqn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: feedback
        })
    });

    alert('Danke für dein Feedback');
    document.getElementById('feedback').value = "";
});

console.log(document.getElementById("menuIconImg"));