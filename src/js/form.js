
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

		/**
		 * Validate email field
		 * Must not be empty
		 * Must follow email format 
		 **/
		if (form.find('#email').length > 0){
			var field = form.find('#email');			

			// Emptiness check
			if (!field.val() || field.val() === "") {
				console.debug("Email cannot be empty");
				valid = false;
				field.parent().addClass('error');
			}

			// Invalid email format, based on proven email validation standards. 
			// See https://emailregex.com/email-validation-summary/ 
			if (!new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(field.val())) {
				console.debug("Email not correct format");
				valid = false;
				field.parent().addClass('error');
			}
		}


		/**
		 * Validate password field
		 * Must be greater than 8 characters
		 **/
		if (form.find('#password').length > 0){
			var field = form.find('#password');			

			// Emptiness check
			if (!field.val() || field.val() === "") {
				console.debug("Password cannot be empty");
				valid = false;
				field.parent().addClass('error');
			}

			// Shortness check
			if (field.val().length < 8) {
				console.debug("Password must be greater than 8 characters");
				valid = false;
				field.parent().addClass('error');
			}
		}


		/**
		 * Validate colour field
		 * Must have a value selected
		 **/
		if (form.find('#colour').length > 0){
			var field = form.find('#colour');			

			// Emptiness check
			if (!field.val() || field.val() === "") {
				console.debug("Colour cannot be empty");
				valid = false;
				field.parent().addClass('error');
			}
		}


		/**
		 * Validate animal field
		 * Must have two or greater selections
		 **/
		if (form.find('input[name="animal"]:checked').length < 2){
			console.debug("Must select at least 2 animals");
			valid = false;
			form.find('input[name="animal"]').parent().addClass('error');
		}


		/**
		 * Validate tiger field
		 * Only required when "tiger" is one of selected "animal"s
		 * Must not be empty
		 **/
		if (form.find('input[name="animal"][value="tiger"]:checked').length > 0){

			if (form.find('#tiger_type').length > 0){
				var field = form.find('#tiger_type');			

				// Emptiness check
				if (!field.val() || field.val() === "") {
					console.debug("Type cannot be empty when Tiger is selected");
					valid = false;
					field.parent().addClass('error');
				}
			} else {				
				console.error("Tiger selected, but Type field not found");
				valid = false;
				form.find('input[name="animal"]').parent().addClass('error');
			}
		}


		// Validation failed; halt submission and alert the user
		if (!valid){
			alert("Validation failed. Please check fields and try again.");
			e.preventDefault();

		// Valid; proceed to submit
		} else {
			console.debug("Validation successful... proceeding with submission.");
			return;
		}
	});
});