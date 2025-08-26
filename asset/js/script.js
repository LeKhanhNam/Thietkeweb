$(document).ready(function () {
  AOS.init({
    duration: 1000,
    once: true,
  });

  let counted = false;
  $(window).scroll(function () {
    if ($("#thong-ke").length) {
      const oTop = $("#thong-ke").offset().top - window.innerHeight;
      if (!counted && $(window).scrollTop() > oTop) {
        $(".countup").each(function () {
          const $this = $(this),
            countTo = $this.attr("data-count");
          $({ countNum: $this.text() }).animate(
            { countNum: countTo },
            {
              duration: 2000,
              easing: "swing",
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
              },
            }
          );
        });
        counted = true;
      }
    }
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm()) {
        alert("Gửi form thành công! Chúng tôi sẽ liên hệ lại bạn sớm nhất.");
        document
          .querySelectorAll(".alert-success, .alert-danger")
          .forEach((el) => el.remove());

        const successMsg = document.createElement("div");
        successMsg.classList.add(
          "alert",
          "alert-success",
          "mt-3",
          "fade",
          "show"
        );
        successMsg.setAttribute("role", "alert");
        successMsg.innerHTML = `
    <strong>Thành công!</strong> Gửi form thành công. Chúng tôi sẽ liên hệ lại bạn sớm nhất.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Đóng"></button>
  `;

        contactForm.appendChild(successMsg);

        contactForm.reset();
      }
    });
  }

  function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const subject = document.getElementById("subject").value;
    const fanStatus = document.querySelector('input[name="fan"]:checked');

    resetErrors();
    let isValid = true;

    if (name.trim() === "") {
      showError("name", "Vui lòng nhập họ và tên của bạn.");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "" || !emailRegex.test(email)) {
      showError("email", "Vui lòng nhập địa chỉ email hợp lệ.");
      isValid = false;
    }

    if (message.trim() === "") {
      showError("message", "Vui lòng nhập nội dung tin nhắn.");
      isValid = false;
    }

    if (subject === "") {
      showError("subject", "Vui lòng chọn một chủ đề.");
      isValid = false;
    }

    if (!fanStatus) {
      showError("fan-radio", "Vui lòng chọn bạn là fan mới hay fan lâu năm.");
      isValid = false;
    }

    return isValid;
  }

  function showError(fieldId, message) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.createElement("div");
    errorElement.classList.add("text-danger", "mt-1", "error-message");
    errorElement.textContent = message;

    if (fieldId === "fan-radio") {
      document
        .querySelector(".form-check")
        .parentNode.appendChild(errorElement);
    } else {
      inputElement.parentNode.appendChild(errorElement);
      inputElement.classList.add("is-invalid");
    }
  }

  function resetErrors() {
    document
      .querySelectorAll(".is-invalid")
      .forEach((el) => el.classList.remove("is-invalid"));
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
  }
});
