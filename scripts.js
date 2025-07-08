document.addEventListener('DOMContentLoaded', function() {
    // Form navigation variables
    const formSections = document.querySelectorAll('.form-section');
    const steps = document.querySelectorAll('.step');
    const form = document.getElementById('registrationForm');
    
    // Navigation buttons
    const toShareSectionBtn = document.getElementById('toShareSection');
    const toDetailsSectionBtn = document.getElementById('toDetailsSection');
    const toUploadSectionBtn = document.getElementById('toUploadSection');
    const toShareSectionBackBtn = document.getElementById('toShareSectionBack');
    const toReviewSectionBtn = document.getElementById('toReviewSection');
    const toUploadSectionBackBtn = document.getElementById('toUploadSectionBack');
    const submitBtn = document.getElementById('submitBtn');
    
    // Share section variables
    const whatsappShareBtn = document.getElementById('whatsappShare');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const shareProgress = document.getElementById('shareProgress');
    const shareCounter = document.getElementById('shareCounter');
    const shareCompleteMessage = document.getElementById('shareCompleteMessage');
    
    // File upload variables
    const resumeInput = document.getElementById('resume');
    const photoInput = document.getElementById('photo');
    const resumeFileName = document.getElementById('resumeFileName');
    const photoFileName = document.getElementById('photoFileName');
    
    // Review section variables
    const reviewName = document.getElementById('reviewName');
    const reviewPhone = document.getElementById('reviewPhone');
    const reviewEmail = document.getElementById('reviewEmail');
    const reviewCollege = document.getElementById('reviewCollege');
    const reviewResume = document.getElementById('reviewResume');
    const reviewPhoto = document.getElementById('reviewPhoto');
    
    // Success message variables
    const successMessage = document.getElementById('successMessage');
    const successEmail = document.getElementById('successEmail');
    
    // Share tracking
    let sharesCompleted = 0;
    const totalSharesRequired = 5;
    
    // Form navigation functions
    function showSection(sectionId) {
        formSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        
        // Update progress steps
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        switch(sectionId) {
            case 'detailsSection':
                document.getElementById('step1').classList.add('active');
                break;
            case 'shareSection':
                document.getElementById('step2').classList.add('active');
                break;
            case 'uploadSection':
                document.getElementById('step3').classList.add('active');
                break;
            case 'reviewSection':
                document.getElementById('step4').classList.add('active');
                break;
        }
    }
    
    // Navigation event listeners
    toShareSectionBtn.addEventListener('click', function() {
        // Validate basic details before proceeding
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const college = document.getElementById('college').value;
        
        if (!name || !phone || !email || !college) {
            alert('Please fill in all required fields before proceeding.');
            return;
        }
        
        showSection('shareSection');
    });
    
    toDetailsSectionBtn.addEventListener('click', function() {
        showSection('detailsSection');
    });
    
    toUploadSectionBtn.addEventListener('click', function() {
        if (sharesCompleted < totalSharesRequired) {
            alert('Please complete at least 5 shares to proceed.');
            return;
        }
        showSection('uploadSection');
    });
    
    toShareSectionBackBtn.addEventListener('click', function() {
        showSection('shareSection');
    });
    
    toReviewSectionBtn.addEventListener('click', function() {
        // Check if at least one file is uploaded
        if (!resumeInput.files[0] && !photoInput.files[0]) {
            alert('Please upload at least one document before proceeding.');
            return;
        }
        
        // Update review section with form data
        reviewName.textContent = document.getElementById('name').value;
        reviewPhone.textContent = document.getElementById('phone').value;
        reviewEmail.textContent = document.getElementById('email').value;
        reviewCollege.textContent = document.getElementById('college').value;
        reviewResume.textContent = resumeInput.files[0] ? resumeInput.files[0].name : 'Not uploaded';
        reviewPhoto.textContent = photoInput.files[0] ? photoInput.files[0].name : 'Not uploaded';
        
        showSection('reviewSection');
    });
    
    toUploadSectionBackBtn.addEventListener('click', function() {
        showSection('uploadSection');
    });
    
    // Share section functionality
    whatsappShareBtn.addEventListener('click', function() {
        const shareText = "Join me in Tech For Girls - a community empowering women in technology! Register now: https://techforgirls.org";
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
        
        updateShareProgress();
    });
    
    copyLinkBtn.addEventListener('click', function() {
        const shareText = "Join me in Tech For Girls - a community empowering women in technology! Register now: https://techforgirls.org";
        navigator.clipboard.writeText(shareText).then(function() {
            alert('Invite link copied to clipboard!');
            updateShareProgress();
        }, function() {
            alert('Failed to copy link. Please try again.');
        });
    });
    
    function updateShareProgress() {
        sharesCompleted = Math.min(sharesCompleted + 1, totalSharesRequired);
        const progressPercentage = (sharesCompleted / totalSharesRequired) * 100;
        
        shareProgress.style.width = `${progressPercentage}%`;
        shareCounter.textContent = `${sharesCompleted}/${totalSharesRequired} shares completed`;
        
        if (sharesCompleted >= totalSharesRequired) {
            shareCompleteMessage.classList.remove('hidden');
            toUploadSectionBtn.disabled = false;
        }
    }
    
    // File upload functionality
    resumeInput.addEventListener('change', function() {
        if (this.files[0]) {
            const file = this.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('Resume file size exceeds 5MB limit. Please choose a smaller file.');
                this.value = '';
                resumeFileName.textContent = '';
                return;
            }
            resumeFileName.textContent = file.name;
        } else {
            resumeFileName.textContent = '';
        }
    });
    
    photoInput.addEventListener('change', function() {
        if (this.files[0]) {
            const file = this.files[0];
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('Photo file size exceeds 2MB limit. Please choose a smaller file.');
                this.value = '';
                photoFileName.textContent = '';
                return;
            }
            photoFileName.textContent = file.name;
        } else {
            photoFileName.textContent = '';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server here
        // For this demo, we'll just show the success message
        
        // Show success message
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
        successEmail.textContent = document.getElementById('email').value;
        
        // Trigger confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        // Scroll to top of success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Initialize the form with the first section
    showSection('detailsSection');
});