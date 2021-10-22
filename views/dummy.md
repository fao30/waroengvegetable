<form name="" method="post">
      <label>User Name</label><br>
      <input type="text" name="username" placeholder="User Name">
      <br><br>
      <label>Password</label><br>
      <input type="password" name="password" placeholder="Password">
      <br><br>
      <input type="button" value="login" onclick="onSignIn()">
    </form>
          <div
            class="g-signin2"
            data-onsuccess="onSignIn"
            data-theme="dark"
            type="allowed_parent_origin"
          >
          </div>
              <script
                src="https://apis.google.com/js/platform.js"
                async
                defer
              >
            </script>
        
              <div
                class="g-signin1"
                data-onsuccess="onSignIn"
                data-theme="dark"
              ></div>
              <script>
                function onSignIn(googleUser) {
                  // Useful data for your client-side scripts:
                  var profile = googleUser.getBasicProfile();
                  // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
                  console.log("Full Name: " + profile.getName());
                  console.log("Given Name: " + profile.getGivenName());
                  console.log("Family Name: " + profile.getFamilyName());
                  console.log("Image URL: " + profile.getImageUrl());
                  console.log("Email: " + profile.getEmail());
                }
              </script>

              <a href="/" onclick="signOut();">Sign out</a>
              <script>
                function signOut() {
                  var auth2 = gapi.auth2.getAuthInstance();
                  auth2.signOut().then(function () {
                    console.log("User signed out.");
                  });
                }
              </script>
        </div>
      </form>
    </div>
