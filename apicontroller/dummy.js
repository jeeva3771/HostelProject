<%- include('../partials/wardenuse/header.ejs', { appURL: appURL, studentAppURL: studentAppURL,
  title: 'Login' }) %>

 <main>
   <div class="container">
     <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
       <div class="container">
         <div class="row justify-content-center">
           <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

             <div class="d-flex justify-content-center py-4">
               <a href="javascript:void(0)" class="logo d-flex align-items-center w-auto">
                 <img src="<%=appURL%>assets/img/logo.png" alt="">
                 <span class="d-none d-lg-block">Hostel</span>
               </a>
             </div><!-- End Logo -->

             <div class="card mb-3">

               <div class="card-body">

                 <div class="pt-4 pb-2">
                   <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                   <p class="text-center small">Enter your email & password to login</p>
                 </div>

                 <div class="row g-3 needs-validation" novalidate>

                   <div class="col-12">
                     <label for="email" class="form-label">Email</label>
                     <div class="input-group has-validation">
                       <input type="email" name="email" class="form-control" id="email" onkeyup="toggleLoginButton()"
                         value="prem123@gmail.com" placeholder="Enter email" required>
                       <div class="invalid-feedback">Please enter your email.</div>
                     </div>
                   </div>

                   <div class="col-12">
                     <label for="password" class="form-label">Password</label>
                     <input type="password" name="password" class="form-control" id="password"
                       onkeyup="toggleLoginButton()" placeholder="Enter password" value="123123" required>
                     <div class="invalid-feedback">Please enter your password!</div>
                   </div>

                   <div class="col-12">
                     <div class="form-check">
                       <input class="form-check-input" type="checkbox" name="remember" id="rememberMe" value="true"
                         onclick="secure()">
                       <label class="form-check-label me-2" for="rememberMe">Remember me</label>
                       <small><a href="<%=appURL%>warden/resetpassword/">Forgotten password?</a></small>
                     </div>
                   </div>
                   <div class="col-12">
                     <button class="btn btn-primary w-100" type="submit" id="loginButton" onclick="loginUser()">
                       Login</button>
                   </div>
                   <a class="text-center small" href="<%=studentAppURL%>student/login/">Student login?</a>

                 </div>
               </div>
             </div>
             <div class="credits">
               Designed by <a href="https://www.linkedin.com/in/jeeva377">Jeeva|Linkedin</a>
             </div>

           </div>
         </div>
       </div>
     </section>
   </div>
 </main>

 <script>
   const loginButton = document.getElementById('loginButton');
   const email = document.getElementById('email');
   const password = document.getElementById('password');

   function loginUser() {
     loginButton.disabled = true;
     const myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");

     const raw = JSON.stringify({
       "emailId": email.value,
       "password": password.value
     });

     const requestOptions = {
       method: "POST",
       headers: myHeaders,
       body: raw,
       redirect: "follow"
     };

     fetch(getAppUrl('api/login'), requestOptions)
       .then(async (response) => {
           if (response.status === 200) {
             window.location = getAppUrl('home')
           } else {
             alert(await response.text())
             loginButton.disabled = false
           }
       })
       .catch(error => {
         alert('Something went wrong.Please try later.')
         loginButton.disabled = false
     })
   }

   function secure() {
     password.type = password.type === "password" ? "text" : "password"
   }

   function toggleLoginButton() {
     loginButton.disabled = !(email.value.length > 0 && password.value.length > 5)
   }

 </script>
