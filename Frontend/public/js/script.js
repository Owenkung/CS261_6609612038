document.addEventListener('DOMContentLoaded', () => {
  const text = document.getElementById('text');
  const password = document.getElementById('password');
  const submit = document.getElementById('submit');
  const show = document.getElementById('show');
  const role = document.getElementById('role');
  const loginContent = document.getElementById('login-content');
  let isPasswordVisible = false;

  // Show/Hide Password
  show.addEventListener('click', (event) => {
      event.preventDefault();
      isPasswordVisible = !isPasswordVisible;
      password.type = isPasswordVisible ? 'text' : 'password';
      show.textContent = isPasswordVisible ? 'Hide Password' : 'Show Password';
  });

  // Handle Login Submission
  submit.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent page reload



      // Capture values
      const textValue = text.value;
      const passwordValue = password.value;
      const roleValue = role.value;

      if (!roleValue) {
          alert("You DIDN'T Choose Your Role");
          return;
      }

      try {
          const response = await axios.post('/api/v1/auth/Ad/verify', {
              UserName: textValue,
              PassWord: passwordValue,
          }, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          const apiData = response.data;

          if (!apiData.status) {
              throw new Error(apiData.message);
          }

          displayUserInfo(apiData.data);

      } catch (error) {
          console.error('Error:', error.message);
          alert(`An error occurred: ${error.message}`);
          // Optionally reload to reset form in case of error
      }
  });

  const displayUserInfo = (userInfo) => {
      // Clear the form content
      loginContent.innerHTML = '';

      // Add success message
      const success = document.createElement('h1');
      success.classList.add('success');
      success.textContent = 'Successfully Logged In';
      loginContent.appendChild(success);

      // Display user information
      const wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      loginContent.appendChild(wrapper);

      const textElement = document.createElement('h1');
      textElement.classList.add('Text');
      textElement.textContent = `Name: ${userInfo.displayname_en}`;
      wrapper.appendChild(textElement);

      const emailElement = document.createElement('h1');
      emailElement.classList.add('Text');
      emailElement.textContent = `Email: ${userInfo.email}`;
      wrapper.appendChild(emailElement);

      if (userInfo.text) {
          const stdIDElement = document.createElement('h1');
          stdIDElement.classList.add('Text');
          stdIDElement.textContent = `Student ID: ${userInfo.text}`;
          wrapper.appendChild(stdIDElement);
      }

      if (userInfo.faculty) {
          const facultyElement = document.createElement('h1');
          facultyElement.classList.add('Text');
          facultyElement.textContent = `Faculty: ${userInfo.faculty}`;
          wrapper.appendChild(facultyElement);
      }

      if (userInfo.organization) {
          const orgElement = document.createElement('h1');
          orgElement.classList.add('Text');
          orgElement.textContent = `Organization: ${userInfo.organization}`;
          wrapper.appendChild(orgElement);
      }

      const roleElement = document.createElement('h1');
      roleElement.classList.add('Text');
      roleElement.textContent = `Your Role: ${userInfo.type}`;
      wrapper.appendChild(roleElement);

      // Add Logout button
      const backBtn = document.createElement('button');
      backBtn.classList.add('back');
      backBtn.textContent = 'Log Out';
      backBtn.addEventListener('click', () => location.reload());
      loginContent.appendChild(backBtn);

  
  };
  document.querySelectorAll('.login-container').forEach(el => el.style.width = "450px")
  
});

