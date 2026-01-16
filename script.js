


//second plan 









 
        // Dark mode detection
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        // Language translations
        let currentLang = 'fr';

        function toggleLanguage() {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            document.getElementById('currentLang').textContent = currentLang.toUpperCase();
            document.querySelectorAll('[data-fr]').forEach(el => {
                el.textContent = el.getAttribute(`data-${currentLang}`);
            });
            document.querySelectorAll('[data-placeholder-fr]').forEach(el => {
                el.placeholder = el.getAttribute(`data-placeholder-${currentLang}`);
            });
        }

        document.getElementById('langToggle').addEventListener('click', toggleLanguage);

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        function openMobileMenu() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenuFunc() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
        mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenuFunc);
        });

        // Scroll reveal animation
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal();

        // Header scroll effect
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        });

        // Gallery functionality
        let currentSlide = 0;
        const totalSlides = 4;

        function moveGallery(direction) {
            currentSlide += direction;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            if (currentSlide >= totalSlides) currentSlide = 0;
            updateGallery();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateGallery();
        }

        function updateGallery() {
            const track = document.getElementById('galleryTrack');
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // Auto-advance gallery
        setInterval(() => moveGallery(1), 5000);

        // Lightbox functionality
        const galleryImages = [
            'https://pfst.cf2.poecdn.net/base/image/6a6906346c8ab533a9bf453cda1e5bdc2edd2630fab7cd1b24320cb918c2357d?w=1536&h=1024',
            'https://pfst.cf2.poecdn.net/base/image/46b0999507877047c8659b374e93e11b61adad229d2af14371cd2c41f730090e?w=1536&h=1024',
            'https://pfst.cf2.poecdn.net/base/image/9593c9259547dfacf0b4cd5545ec9b321f7cd4d41fe07328b326bc3f2a942d7a?w=1536&h=1024',
            'https://pfst.cf2.poecdn.net/base/image/d6f3b5f2f0109cad230f2023b5a38f8614b4779b4e804ecf01e020b40c2a5ada?w=1536&h=1024'
        ];

        function openLightbox(index) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightboxImage');
            lightboxImage.src = galleryImages[index];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target === document.getElementById('lightbox')) {
                closeLightbox();
            }
        });

        // CV Upload functionality
        const dropZone = document.getElementById('dropZone');
        const cvFileInput = document.getElementById('cvFile');
        const dropZoneContent = document.getElementById('dropZoneContent');
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        let uploadedFile = null;

        dropZone.addEventListener('click', () => cvFileInput.click());

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        cvFileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });

        function handleFile(file) {
            if (file.type !== 'application/pdf') {
                showToast(currentLang === 'fr' ? 'Veuillez sélectionner un fichier PDF' : 'Please select a PDF file', 'error');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                showToast(currentLang === 'fr' ? 'Le fichier doit faire moins de 5MB' : 'File must be less than 5MB', 'error');
                return;
            }
            uploadedFile = file;
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            dropZoneContent.classList.add('hidden');
            fileInfo.classList.remove('hidden');
            dropZone.classList.add('has-file');
        }

        function removeFile() {
            uploadedFile = null;
            cvFileInput.value = '';
            dropZoneContent.classList.remove('hidden');
            fileInfo.classList.add('hidden');
            dropZone.classList.remove('has-file');
        }

        function formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        }

        // Toast notification
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            toastMessage.textContent = message;
            toast.classList.remove('error');
            if (type === 'error') {
                toast.classList.add('error');
            }
            toast.classList.add('active');
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        }

        // Quote form submission
        const quoteForm = document.getElementById('quoteForm');
        const successModal = document.getElementById('successModal');

        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(quoteForm);
            const data = {};
            formData.forEach((value, key) => {
                if (data[key]) {
                    data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
                } else {
                    data[key] = value;
                }
            });

            // Show success modal
            document.getElementById('modalTitle').textContent = currentLang === 'fr' ? 'Merci!' : 'Thank you!';
            document.getElementById('modalMessage').textContent = currentLang === 'fr'
                ? 'Votre demande de soumission a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais.'
                : 'Your quote request has been sent successfully. We will contact you as soon as possible.';

            successModal.classList.add('active');
            const modalContent = successModal.querySelector('.modal-content');
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            }, 100);

            quoteForm.reset();
        });

        function closeModal() {
            const modalContent = successModal.querySelector('.modal-content');
            modalContent.style.transform = 'scale(0.95)';
            modalContent.style.opacity = '0';
            setTimeout(() => {
                successModal.classList.remove('active');
            }, 300);
        }

        // Job application form submission
        const jobForm = document.getElementById('jobForm');
        const submitJobBtn = document.getElementById('submitJobBtn');

        jobForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('jobName').value.trim();
            const phone = document.getElementById('jobPhone').value.trim();
            const email = document.getElementById('jobEmail').value.trim();
            const position = document.getElementById('jobPosition').value;
            const message = document.getElementById('jobMessage').value.trim();

            if (!name || !phone || !email || !position) {
                showToast(currentLang === 'fr' ? 'Veuillez remplir tous les champs obligatoires' : 'Please fill in all required fields', 'error');
                return;
            }

            if (!uploadedFile) {
                showToast(currentLang === 'fr' ? 'Veuillez télécharger votre CV (PDF)' : 'Please upload your CV (PDF)', 'error');
                return;
            }

            // Disable button and show loading
            submitJobBtn.disabled = true;
            submitJobBtn.innerHTML = '<div class="spinner mx-auto"></div>';

            // Convert PDF to base64
            const reader = new FileReader();
            reader.onload = function() {
                const base64PDF = reader.result.split(',')[1];

                // Create email body
                const emailBody = `
Nouvelle candidature - EXONE TRANSPORT

Nom: ${name}
Téléphone: ${phone}
Email: ${email}
Poste souhaité: ${position}

Message:
${message || 'Aucun message'}

---
CV en pièce jointe (fichier: ${uploadedFile.name})

Note: Le CV est encodé en base64 ci-dessous. Copiez le texte et utilisez un décodeur base64 pour récupérer le fichier PDF, ou demandez au candidat de vous envoyer le CV directement.

=== DEBUT DU CV (Base64) ===
${base64PDF.substring(0, 1000)}...
[CV tronqué - Contactez le candidat pour le fichier complet]
=== FIN ===
                `.trim();

                // Create mailto link
                const mailtoLink = `mailto:gabellareference@gmail.com?subject=${encodeURIComponent('Candidature - ' + position + ' - ' + name)}&body=${encodeURIComponent(emailBody)}`;

                // Open email client
                window.open(mailtoLink, '_blank');

                // Show success modal
                document.getElementById('modalTitle').textContent = currentLang === 'fr' ? 'Candidature préparée!' : 'Application prepared!';
                document.getElementById('modalMessage').innerHTML = currentLang === 'fr'
                    ? `Votre client email s'est ouvert avec votre candidature.<br><br><strong>Important:</strong> N'oubliez pas d'attacher votre CV (${uploadedFile.name}) au email avant de l'envoyer.`
                    : `Your email client has opened with your application.<br><br><strong>Important:</strong> Don't forget to attach your CV (${uploadedFile.name}) to the email before sending.`;

                successModal.classList.add('active');
                const modalContent = successModal.querySelector('.modal-content');
                setTimeout(() => {
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                }, 100);

                // Reset form
                jobForm.reset();
                removeFile();

                // Reset button
                submitJobBtn.disabled = false;
                submitJobBtn.innerHTML = `<span data-fr="Envoyer ma candidature" data-en="Submit my application">${currentLang === 'fr' ? 'Envoyer ma candidature' : 'Submit my application'}</span><i class="fas fa-paper-plane"></i>`;
            };

            reader.onerror = function() {
                showToast(currentLang === 'fr' ? 'Erreur lors de la lecture du fichier' : 'Error reading file', 'error');
                submitJobBtn.disabled = false;
                submitJobBtn.innerHTML = `<span data-fr="Envoyer ma candidature" data-en="Submit my application">${currentLang === 'fr' ? 'Envoyer ma candidature' : 'Submit my application'}</span><i class="fas fa-paper-plane"></i>`;
            };

            reader.readAsDataURL(uploadedFile);
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    




