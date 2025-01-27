@props([
  'class',
  'name',
  'value',
  'id' => 'email', // Default ID if not provided
  'disabledfield',
  'disabled',
])

<div class="grid-input">
  <input 
    id="{{ $id }}" 
    type="text" 
    class="{{ $class ?? '' }} @error($name ?? '') is-invalid @enderror" 
    name="{{ $name ?? '' }}" 
    value="{{ $value ?? '' }}" 
    autocomplete="email" 
    placeholder="Enter email"
    {{ $disabledfield ?? '' }} 
    {{ $disabled ?? '' }}
  />
  @error($name ?? '')
    <div class="invalid-feedback" style="color: red;">
      {{ $message }}
    </div>
  @enderror
  <div class="email-error-message" style="color: red; display: none;"></div> <!-- Dedicated error message div -->
</div>

@once
  @push('js')
    <script>
      $(document).ready(function() {
        $("body").on('input', '#{{ $id }}', function() {
          var emailField = $(this);
          var emailValue = emailField.val();
          var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // More robust email pattern for validation
          var errorMessageDiv = $('.email-error-message'); // Get the error message div

          // Clear previous error message
          errorMessageDiv.text('').hide();

          // Check if the email format is valid
          if (!emailPattern.test(emailValue)) {
            errorMessageDiv.text("Please enter a valid email address.").show();
          } else if (emailValue.includes(" ")) {
            errorMessageDiv.text("Email cannot contain spaces.").show();
          }
        });
      });
    </script>
  @endpush
@endonce