import React from "react";

export default function Register() {
  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div th:if="${param.success}">
              <div class="alert alert-info">
                You've successfully registered to our awesome app!
              </div>
            </div>

            <h1>Registration</h1>

            <form
              th:action="@{/registration}"
              method="post"
              th:object="${user}"
            >
              <div class="form-group">
                <label class="control-label" for="firstName">
                  {" "}
                  First Name{" "}
                </label>
                <input
                  id="firstName"
                  class="form-control"
                  th:field="*{firstName}"
                  required
                  autofocus="autofocus"
                />
              </div>

              <div class="form-group">
                <label class="control-label" for="lastName">
                  {" "}
                  Last Name{" "}
                </label>{" "}
                <input
                  id="lastName"
                  class="form-control"
                  th:field="*{lastName}"
                  required
                  autofocus="autofocus"
                />
              </div>

              <div class="form-group">
                <label class="control-label" for="email">
                  {" "}
                  Email{" "}
                </label>{" "}
                <input
                  id="email"
                  class="form-control"
                  th:field="*{email}"
                  required
                  autofocus="autofocus"
                />
              </div>

              <div class="form-group">
                <label class="control-label" for="password">
                  {" "}
                  Password{" "}
                </label>{" "}
                <input
                  id="password"
                  class="form-control"
                  type="password"
                  th:field="*{password}"
                  required
                  autofocus="autofocus"
                />
              </div>

              <div class="form-group">
                <button type="submit" class="btn btn-success">
                  Register
                </button>
                <span>
                  Already registered?{" "}
                  <a href="http://localhost:8080/registration">
                    Login here
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
