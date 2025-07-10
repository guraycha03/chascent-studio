document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form elements
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage'); // Div to display status messages (loading, success, error)
    const submitButton = document.getElementById('submitButton'); // The submit button
    const submitButtonText = submitButton ? submitButton.querySelector('.button-text') : null; // Span holding the button text
    const submitButtonStars = submitButton ? submitButton.querySelectorAll('.star-1, .star-2, .star-3, .star-4, .star-5, .star-6') : []; // All star SVG containers
    const notificationContainer = document.getElementById('notification-container'); // Get the new notification container

    /**
     * Displays a toast notification at the bottom of the screen.
     * @param {string} message - The text content of the notification.
     * @param {string} type - The type of notification ('success', 'error', or 'info'). Affects background color.
     * @param {number} duration - How long the notification should be visible in milliseconds (default: 3000ms).
     */
    function showToastNotification(message, type = 'info', duration = 3000) {
        if (!notificationContainer) {
            console.warn('Notification container not found. Cannot display toast.');
            return;
        }

        const toast = document.createElement('div');
        toast.classList.add('toast-notification', type);
        toast.textContent = message;

        notificationContainer.appendChild(toast);

        // Remove the toast after the animation and duration
        setTimeout(() => {
            toast.style.opacity = '0'; // Start fade out
            toast.style.transform = 'translateY(20px)';
            // Give it some time to fade out before removing from DOM
            toast.addEventListener('transitionend', () => {
                toast.remove();
            }, { once: true }); // Ensure the event listener is removed after first use
        }, duration);
    }

    // --- Engaging Interactions for the Submit Button ---
    // Check if the submit button exists before adding event listeners
    if (submitButton) {
        // Add a subtle hover effect for interactivity
        submitButton.addEventListener('mouseover', () => {
            submitButton.style.transform = 'scale(1.05)';
            submitButton.style.transition = 'transform 0.2s ease-in-out';
        });
        submitButton.addEventListener('mouseout', () => {
            submitButton.style.transform = 'scale(1)';
        });
        
        // Add a small "clicked" animation to make the button feel responsive
        submitButton.addEventListener('click', () => {
            submitButton.classList.add('clicked');
            setTimeout(() => {
                submitButton.classList.remove('clicked');
            }, 200); // Remove the class after a short delay
        });
    }

    // --- Form Submission Handling Logic ---
    // Ensure all necessary elements for the form are present before adding the submit listener
    if (contactForm && formMessage && submitButton && submitButtonText) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the browser's default form submission (which would reload the page)

            // Disable the submit button to prevent multiple submissions
            submitButton.disabled = true;
            submitButton.classList.add('loading'); // Add a 'loading' class for CSS styling (e.g., spinner)
            
            // Change the button text and hide the decorative SVG stars during submission
            submitButtonText.textContent = 'Sending...'; 
            submitButtonStars.forEach(star => star.style.display = 'none'); // Temporarily hide stars

            // Display a loading message to the user
            formMessage.textContent = 'Sending your message...';
            formMessage.className = 'form-message loading'; // Apply 'loading' styles to the message div

            try {
                // --- Simulate Backend API Call ---
                // In a real-world application, you would replace this section with actual code
                // to send form data to your server (e.g., using fetch() API).
                // Example of a real fetch request (uncomment and modify for actual use):
                /*
                const formData = new FormData(contactForm); // Collects all form data
                const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
                    method: 'POST',
                    body: formData,
                    // If sending JSON instead of FormData, you might use:
                    // headers: { 'Content-Type': 'application/json' },
                    // body: JSON.stringify(Object.fromEntries(formData.entries()))
                });

                if (!response.ok) {
                    // If the server response is not OK (e.g., 4xx or 5xx status code), throw an error
                    const errorData = await response.json(); // Try to parse error message from server
                    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                }
                // const result = await response.json(); // If your API returns data upon success
                */

                // Simulate a network request delay for demonstration purposes (2 seconds)
                await new Promise(resolve => setTimeout(resolve, 2000)); 

                // --- Simulate Success or Error for Demonstration ---
                // This will randomly succeed 70% of the time and fail 30% of the time.
                const isSuccess = Math.random() > 0.3; 

                if (isSuccess) {
                    // On successful submission
                    formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                    formMessage.className = 'form-message success'; // Apply success styles
                    contactForm.reset(); // Clear all form fields
                    showToastNotification('Your message has been sent successfully!', 'success'); // Show success toast
                } else {
                    // On simulated failure, throw an error
                    throw new Error('Something went wrong. Please try again later.');
                }
            } catch (error) {
                // Catch any errors that occur during the submission process (e.g., network issues, API errors)
                formMessage.textContent = `Error: ${error.message || 'Unable to send message.'}`;
                formMessage.className = 'form-message error'; // Apply error styles
                showToastNotification(`Error: ${error.message || 'Failed to send message.'}`, 'error'); // Show error toast
            } finally {
                // This block runs after try/catch, regardless of success or failure
                // Re-enable the submit button
                submitButton.disabled = false;
                submitButton.classList.remove('loading'); // Remove the loading class
                
                // Restore the original button text and show the SVG stars again
                // The data-original-text attribute on the button stores the initial text
                submitButtonText.textContent = submitButton.dataset.originalText; 
                submitButtonStars.forEach(star => star.style.display = 'block'); // Show stars
            }
        });
    } else {
        // Log a warning if essential form elements are missing, which could cause the script to not function
        console.warn('Contact form elements not found. Please ensure #contactForm, #formMessage, #submitButton, and a .button-text span exist.');
    }
});