document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;

    // --- Mobile Navigation Toggle Logic ---
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('is-open'); 
        menuToggle.classList.toggle('is-active'); 
        body.classList.toggle('no-scroll'); 
    });

    // Close menu when a navigation link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open') && window.innerWidth < 768) {
                mainNav.classList.remove('is-open');
                menuToggle.classList.remove('is-active');
                body.classList.remove('no-scroll');
            }
        });
    });

    // --- Lazy Loading for Product Images ---
    const lazyImages = document.querySelectorAll('.product-image');

    const observerOptions = {
        root: null, 
        rootMargin: '0px', 
        threshold: 0.1 
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const imgDiv = entry.target;
                const imgSrc = imgDiv.dataset.src;

                if (imgSrc) {
                    const img = new Image();
                    img.src = imgSrc;
                    img.onload = () => {
                        imgDiv.style.backgroundImage = `url('${imgSrc}')`; 
                        imgDiv.style.backgroundSize = 'cover'; 
                        imgDiv.style.backgroundPosition = 'center'; 
                    };
                    img.onerror = () => {
                        console.error('Error loading image:', imgSrc);
                        imgDiv.style.backgroundImage = `none`;
                        imgDiv.style.backgroundColor = 'var(--accent)'; 
                    };
                }
                observer.unobserve(imgDiv);
            }
        });
    }, observerOptions);

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // --- Image Modal Logic ---
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductDesc = document.getElementById('modalProductDesc');
    const modalShopButton = document.getElementById('modalShopButton');
    const closeModalBtn = document.querySelector('.image-modal-close');
    const productCards = document.querySelectorAll('.product-card');

    // Function to open the modal with product information
    const openModal = (imageSrc, name, description) => {
    modalImage.src = imageSrc;
    modalImage.alt = name + " - Product image";
    modalProductName.textContent = name;
    modalProductDesc.innerHTML = description;
    modalShopButton.style.display = 'none';

    imageModal.classList.add('active');
    body.classList.add('no-scroll');
};

    // Function to close the modal
    const closeModal = () => {
    imageModal.classList.remove('active');
    body.classList.remove('no-scroll');

    modalImage.src = '';
    modalImage.alt = '';
    modalProductName.textContent = '';
    modalProductDesc.textContent = '';
    modalShopButton.style.display = 'inline-block';
};


    // Add click event listener to each product card
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productImageDiv = card.querySelector('.product-image');
            const imageUrl = productImageDiv.dataset.src;

            const productName = card.querySelector('.product-name').textContent;
            const productDesc = card.querySelector('.product-desc').innerHTML;


            if (imageUrl && productName && productDesc) {
                openModal(imageUrl, productName, productDesc);
            }
        });
    });

    // Add click event listener to the close button
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal if user clicks outside the image content
    imageModal.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- About Us Image Slideshow ---
    const aboutImagesContainer = document.querySelector('.about-image');
    const aboutImages = aboutImagesContainer ? aboutImagesContainer.querySelectorAll('img') : [];
    let currentAboutImageIndex = 0;

    const updateAboutImage = () => {
        if (aboutImages.length === 0) return;

        aboutImages.forEach(img => img.classList.remove('active'));
        aboutImages[currentAboutImageIndex].classList.add('active');
        currentAboutImageIndex = (currentAboutImageIndex + 1) % aboutImages.length;
    };

    if (aboutImages.length > 0) {
        aboutImages[0].classList.add('active');
        setInterval(updateAboutImage, 3000);

    }

});