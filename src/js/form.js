
$(document).ready(function(){

	// Unlock the submit button.
	// By having it initially disabled, we prevent users from submitting that don't have
	// (or have disabled) javascript
	$(document).find('input[type="submit"]').prop('disabled', false);

	// Bind to all form submission events
	$(document).on('submit', 'form', function(e){

		var form = $(this);

		// Default to valid. Any invalid field will switch this off, preventing
		// form submission
		var valid = true;
		form.find('.error').removeClass('error');
		form.find('.field--error').removeClass('field--error');

		// Delete all our field messages (if any)
		// This gives us a clean slate for this next submission attempt
		form.find('.field__message').remove();

		/**
		 * Validate email field
		 * Must not be empty
		 * Must follow email format 
		 **/
		if (form.find('#email').length > 0){
			var input = form.find('#email');
			var field = input.closest('.field');

			// Emptiness check
			if (!input.val() || input.val() === "") {
				valid = false;
				field.append('<div class="field__message field__message--bad">Email cannot be empty</div>');
				field.addClass('error field--error');

			// Invalid email format, based on proven email validation standards. 
			// See https://emailregex.com/email-validation-summary/ 
			} else if (!new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(input.val())) {
				valid = false;
				field.append('<div class="field__message field__message--bad">Email not correct format</div>');
				field.addClass('error field--error');
			}
		}


		/**
		 * Validate password field
		 * Must be greater than 8 characters
		 **/
		if (form.find('#password').length > 0){
			var input = form.find('#password');
			var field = input.closest('.field');

			// Emptiness check
			if (!input.val() || input.val() === "") {
				valid = false;
				field.append('<div class="field__message field__message--bad">Password cannot be empty</div>');
				field.addClass('error field--error');
			}

			// Shortness check
			if (input.val().length < 8) {
				valid = false;
				field.append('<div class="field__message field__message--bad">Password must be greater than 8 characters</div>');
				field.addClass('error field--error');
			}
		}


		/**
		 * Validate colour field
		 * Must have a value selected
		 **/
		if (form.find('#colour').length > 0){
			var input = form.find('#colour');	
			var field = input.closest('.field');		

			// Emptiness check
			if (!input.val() || input.val() === "") {
				valid = false;
				field.append('<div class="field__message field__message--bad">Colour cannot be empty</div>');
				field.addClass('error field--error');
			}
		}


		/**
		 * Validate animal field
		 * Must have two or greater selections
		 **/
		if (form.find('input[name="animal"]:checked').length < 2){
			valid = false;

			var field = form.find('input[name="animal"]').closest('.field');
			field.append('<div class="field__message field__message--bad">Must select at least 2 animals</div>');
			field.addClass('error field--error');
		}


		/**
		 * Validate tiger field
		 * Only required when "tiger" is one of selected "animal"s
		 * Must not be empty
		 **/
		if (form.find('input[name="animal"][value="tiger"]:checked').length > 0){

			if (form.find('#tiger_type').length > 0){
				var input = form.find('#tiger_type');
				var field = input.closest('.field');

				// Emptiness check
				if (!input.val() || input.val() === "") {
					valid = false;
					field.append('<div class="field__message field__message--bad">Type cannot be empty when Tiger is selected</div>');
					field.addClass('error field--error');
				}
			} else {				
				valid = false;
				console.error("Tiger selected, but Type field not found");
			}
		}


		// Validation failed; halt submission and alert the user
		if (!valid){
			e.preventDefault();

		// Valid; proceed to submit
		} else {
			form.find('input[type="submit"]').val('Submitting').setAttribute('disabled','disabled');
		}
	});
});