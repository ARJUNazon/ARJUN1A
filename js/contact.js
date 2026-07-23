/* ---------------------------------------------------------------
     9. CONTACT FORM VALIDATION + SUCCESS ANIMATION
     --------------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = form.querySelector('.form-submit');

  function validateField(field){
    const group = field.closest('.form-group');
    const value = field.value.trim();
    let valid = true;
    let message = '';

    if(field.id === 'cname'){
      valid = value.length > 0;
      message = valid ? '' : 'Customer Name cannot be empty.';
    } else if(field.id === 'cphone'){
      valid = /^\d{10}$/.test(value);
      message = valid ? '' : 'Phone Number must contain exactly 10 digits.';
    } else if(field.id === 'cemail'){
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      message = valid ? '' : 'Email must be in valid email format.';
    } else if(field.id === 'cmessage'){
      valid = value.length > 0;
      message = valid ? '' : 'Message cannot be empty.';
    }

    const errorEl = group.querySelector('.form-error');
    errorEl.textContent = message;
    group.classList.toggle('invalid', !valid);
    group.classList.toggle('valid', valid && value.length > 0);
    return valid;
  }

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      validateField(field);
      if(formSuccess.classList.contains('show')){
        formSuccess.classList.remove('show');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.remove('show');
    submitBtn.classList.remove('success');

    const fields = form.querySelectorAll('input, textarea');
    let allValid = true;
    fields.forEach(f => { if(!validateField(f)) allValid = false; });

    if(!allValid) return;

    formSuccess.textContent = 'Your message has been submitted successfully.';
    submitBtn.classList.add('success');
    formSuccess.classList.add('show');
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('valid', 'invalid');
        group.querySelector('.form-error').textContent = '';
      });
      submitBtn.classList.remove('success');
      submitBtn.disabled = false;
      formSuccess.classList.remove('show');
    }, 3000);
  });

