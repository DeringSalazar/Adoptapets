// Variables globales
let currentFilter = 'all';
let selectedDonationAmount = 100;

// Datos de mascotas
const petsData = {
    1: {
        name: "Luna",
        age: "2 años",
        gender: "Hembra",
        size: "Mediano",
        type: "gatos",
        description: "Luna es una gatita muy cariñosa y juguetona. Le encanta estar cerca de las personas y es perfecta para familias con niños. Ya está esterilizada y tiene todas sus vacunas al día.",
        image: "Assets/IMG#1.png"
    },
    2: {
        name: "Max",
        age: "3 años",
        gender: "Macho",
        size: "Grande",
        type: "perros",
        description: "Max es un perro muy leal y protector. Está entrenado y es ideal para familias activas que disfruten de largos paseos y actividades al aire libre.",
        image: "https://via.placeholder.com/280x250/3498db/ffffff?text=MAX"
    },
    3: {
        name: "Mimi",
        age: "1 año",
        gender: "Hembra",
        size: "Pequeño",
        type: "gatos",
        description: "Mimi es una gatita muy tímida pero dulce. Necesita una familia paciente que le ayude a ganar confianza. Una vez que se sienta cómoda, será muy cariñosa.",
        image: "https://via.placeholder.com/280x250/e74c3c/ffffff?text=MIMI"
    },
    4: {
        name: "Rocky",
        age: "5 años",
        gender: "Macho",
        size: "Mediano",
        type: "perros",
        description: "Rocky es un perro muy tranquilo y cariñoso. Es perfecto para personas mayores o familias que buscan una mascota relajada y bien educada.",
        image: "https://via.placeholder.com/280x250/2ecc71/ffffff?text=ROCKY"
    },
    5: {
        name: "Bella",
        age: "2 años",
        gender: "Hembra",
        size: "Pequeño",
        type: "perros",
        description: "Bella es una perrita muy energética y juguetona. Le encanta correr y jugar, ideal para familias activas con niños que puedan darle mucho ejercicio.",
        image: "https://via.placeholder.com/280x250/f39c12/ffffff?text=BELLA"
    },
    6: {
        name: "Simba",
        age: "4 años",
        gender: "Macho",
        size: "Grande",
        type: "gatos",
        description: "Simba es un gato muy independiente pero cariñoso. Es perfecto para personas que buscan una mascota tranquila que también disfrute de momentos de cariño.",
        image: "https://via.placeholder.com/280x250/9b59b6/ffffff?text=SIMBA"
    }
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePetFilters();
    initializeDonations();
    initializeContactForm();
    initializeModal();
    addScrollAnimations();
    initializeImageErrorHandling();
});

// Navegación móvil
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inicializar filtros de mascotas
function initializePetFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener el filtro seleccionado
            const filter = this.getAttribute('data-filter');
            filterPets(filter);
        });
    });
}

// Filtrar mascotas
function filterPets(filter) {
    const petCards = document.querySelectorAll('.pet-card');
    
    petCards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Mostrar detalles de mascota
function showPetDetails(petId) {
    const pet = petsData[petId];
    if (!pet) return;

    const modal = document.getElementById('pet-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${pet.image}" alt="${pet.name}" style="width: 200px; height: 200px; object-fit: cover; border-radius: 10px;">
        </div>
        <h2 style="color: #2c3e50; text-align: center; margin-bottom: 15px;">${pet.name}</h2>
        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
            <span><i class="fas fa-birthday-cake"></i> ${pet.age}</span>
            <span><i class="fas fa-venus-mars"></i> ${pet.gender}</span>
            <span><i class="fas fa-ruler"></i> ${pet.size}</span>
        </div>
        <p style="color: #7f8c8d; margin-bottom: 20px; line-height: 1.6;">${pet.description}</p>
        <div style="text-align: center;">
            <button class="btn btn-primary" onclick="contactForAdoption('${pet.name}')">
                <i class="fas fa-heart"></i> Contactar para Adopción
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Contactar para adopción
function contactForAdoption(petName) {
    // Cerrar modal
    const modal = document.getElementById('pet-modal');
    modal.style.display = 'none';
    
    // Scroll a la sección de contacto
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Prellenar el formulario
    setTimeout(() => {
        const subjectSelect = document.getElementById('subject');
        const messageTextarea = document.getElementById('message');
        
        if (subjectSelect) subjectSelect.value = 'adopcion';
        if (messageTextarea) {
            messageTextarea.value = `Hola, estoy interesado/a en adoptar a ${petName}. Me gustaría obtener más información sobre el proceso de adopción.`;
        }
    }, 500);
    
    // Mostrar mensaje
    alert(`¡Excelente! Te hemos dirigido al formulario de contacto para que puedas consultar sobre la adopción de ${petName}.`);
}

// Inicializar sistema de donaciones
function initializeDonations() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const donationBtn = document.querySelector('.donation-btn');

    if (!amountButtons.length || !donationBtn) {
        console.warn('Elementos de donación no encontrados');
        return;
    }

    // Event listeners para botones de cantidad
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedDonationAmount = parseInt(this.getAttribute('data-amount'));
            if (customAmountInput) customAmountInput.value = '';
        });
    });

    // Event listener para cantidad personalizada
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            if (this.value) {
                amountButtons.forEach(btn => btn.classList.remove('active'));
                selectedDonationAmount = parseInt(this.value) || 0;
            }
        });
    }

    // Event listener para botón de donación
    donationBtn.addEventListener('click', function() {
        const amount = customAmountInput && customAmountInput.value ? parseInt(customAmountInput.value) : selectedDonationAmount;
        if (amount && amount > 0) {
            processDonation(amount);
        } else {
            alert('Por favor, selecciona o ingresa una cantidad válida para donar.');
        }
    });
}

// Procesar donación (simulado)
function processDonation(amount) {
    // Aquí normalmente se integraría con un procesador de pagos como Stripe, PayPal, etc.
    alert(`¡Gracias por tu generosa donación de $${amount}! Tu contribución nos ayuda a seguir salvando vidas. En una implementación real, serías redirigido a la plataforma de pago.`);
}

// Inicializar formulario de contacto
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.warn('Formulario de contacto no encontrado');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validar datos
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        
        // Simular envío de formulario
        processContactForm(data);
    });
}

// Procesar formulario de contacto (simulado)
function processContactForm(data) {
    // Aquí normalmente se enviaría el formulario a un servidor
    alert(`¡Gracias ${data.name}! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto a través de ${data.email}.`);
    
    // Limpiar formulario
    document.getElementById('contact-form').reset();
}

// Inicializar modal
function initializeModal() {
    const modal = document.getElementById('pet-modal');
    const closeBtn = document.querySelector('.close');
    
    if (!modal || !closeBtn) {
        console.warn('Modal o botón de cerrar no encontrado');
        return;
    }
    
    // Cerrar modal al hacer clic en X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Animaciones al hacer scroll
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll('.foster-card, .stat, .impact-item, .contact-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Inicializar manejo de errores de imagen
function initializeImageErrorHandling() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
}

// Función para manejar errores de carga de imágenes
function handleImageError(img) {
    img.src = 'https://via.placeholder.com/280x250/95a5a6/ffffff?text=Imagen+no+disponible';
    img.alt = 'Imagen no disponible';
}

// Funciones de utilidad
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Agregar botón de scroll to top (opcional)
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scroll-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Efectos adicionales para mejorar la experiencia
document.addEventListener('DOMContentLoaded', function() {
    // Agregar efecto hover a las tarjetas
    const cards = document.querySelectorAll('.foster-card, .pet-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Función expuesta globalmente para ser llamada desde el HTML
window.showPetDetails = showPetDetails;
window.contactForAdoption = contactForAdoption;