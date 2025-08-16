// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('June 22, 2027 11:30:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display results
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // If countdown is over
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.querySelector('.countdown').innerHTML = '<div>We\'re married!</div>';
    }
}

// Initialize countdown
updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        answer.classList.toggle('show');
    });
});


// RSVP Form Submission
const rsvpForm = document.getElementById('rsvp-form');

rsvpForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        guests: document.getElementById('guests').value,
        attending: document.querySelector('input[name="attending"]:checked').value,
        meal: document.getElementById('meal').value,
        message: document.getElementById('message').value
    };
    
    // Simple validation
    if (!formData.name) {
        alert('Please enter your name');
        return;
    }
    
    try {
        // Updated to use FormData and URLSearchParams for better compatibility
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('guests', formData.guests);
        formDataObj.append('attending', formData.attending);
        formDataObj.append('meal', formData.meal);
        formDataObj.append('message', formData.message);
        
        const response = await fetch('https://script.google.com/macros/s/AKfycbzd4ulySyzMCPxSkIhJYY2AYCSNy71ijvUvC3x253Yw2NDS3dETl3Nf_ea70UEABPiyBQ/exec', {
            method: 'POST',
            body: formDataObj
        });
        
        // Check if response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const result = await response.text(); // Changed to text() since Google Apps Script might return plain text
        
        if (result.includes('success')) {
            if (formData.attending === 'yes') {
                alert(`Thank you ${formData.name} for your RSVP! We look forward to celebrating with you.`);
            } else {
                alert(`Thank you ${formData.name} for letting us know. We'll miss you!`);
            }
            rsvpForm.reset();
        } else {
            throw new Error('Failed to save RSVP');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your RSVP. Please try again later or contact us directly.');
    }
});



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

