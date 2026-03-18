// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("RKkc6-mJdLFB8YIAM"); 
})();

const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const loader = document.getElementById('loader');
const btnText = document.getElementById('btn-text');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show Loading State
    btnText.style.display = 'none';
    loader.style.display = 'inline-block';
    submitBtn.disabled = true;

    // Send Email
    emailjs.sendForm('service_vk1bh2c', 'template_uotq8ja', this)
        .then(() => {
            statusMsg.innerText = "✅ Proposal Sent! Opening WhatsApp for instant chat...";
            statusMsg.style.color = "#00f2ff";
            
            // Redirect to WhatsApp after 2 seconds
            const name = document.getElementById('user_name').value;
            const wpMsg = encodeURIComponent(`Hi Kartik, I just sent a project proposal through your portfolio. My name is ${name}.`);
            
            setTimeout(() => {
                window.open(`https://wa.me/918882246983?text=${wpMsg}`, '_blank'); // Replace X with your number
                contactForm.reset();
                resetButton();
            }, 2000);

        }, (error) => {
            statusMsg.innerText = "❌ Error: Could not send. Please check your connection.";
            statusMsg.style.color = "#ff4d4d";
            resetButton();
        });
});

function resetButton() {
    btnText.style.display = 'inline-block';
    loader.style.display = 'none';
    submitBtn.disabled = false;
}