class PincodeCheck extends HTMLElement {
  constructor() {
    super();

    this.pincodeInput = this.querySelector("input");

    this.pincodeInput.addEventListener("click", this.clearValues.bind(this));
    this.pincodeInput.addEventListener("keypress", this.readPincode.bind(this));

    this.checkAvailabilityBtn = this.querySelector("button");

    this.checkAvailabilityBtn.addEventListener(
      "click",
      this.checkPincodeAvailability.bind(this)
    );

    this.pincodeAvailabilityText = this.querySelector("p");
  }

  clearValues(e) {
    if (e.target.value !== "") {
      this.pincodeInput.value = "";
      this.pincodeAvailabilityText.textContent = "";
    }
  }

  readPincode(e) {
    if (e.which < 48 || e.which > 57 || e.target.value.length === 6) {
      e.preventDefault();
    }
  }

  checkPincodeAvailability() {
    const availablePincodes = {
      deliveryLocations: [
        {
          pincode: "110001",
          estimatedDeliveryDays: 2,
          locationName: "Connaught Place, Delhi",
        },
        {
          pincode: "400001",
          estimatedDeliveryDays: 3,
          locationName: "Fort, Mumbai",
        },
        {
          pincode: "700001",
          estimatedDeliveryDays: 4,
          locationName: "Dalhousie Square, Kolkata",
        },
        {
          pincode: "600001",
          estimatedDeliveryDays: 3,
          locationName: "Parrys Corner, Chennai",
        },
        {
          pincode: "500001",
          estimatedDeliveryDays: 2,
          locationName: "Afzal Gunj, Hyderabad",
        },
        {
          pincode: "110020",
          estimatedDeliveryDays: 5,
          locationName: "Hauz Khas, Delhi",
        },
        {
          pincode: "400020",
          estimatedDeliveryDays: 4,
          locationName: "Worli, Mumbai",
        },
        {
          pincode: "700020",
          estimatedDeliveryDays: 3,
          locationName: "Salt Lake City, Kolkata",
        },
        {
          pincode: "600020",
          estimatedDeliveryDays: 2,
          locationName: "Anna Nagar, Chennai",
        },
        {
          pincode: "500020",
          estimatedDeliveryDays: 4,
          locationName: "Banjara Hills, Hyderabad",
        },
      ],
    };

    const pincode = this.pincodeInput.value;

    if (pincode.length < 6) {
      this.pincodeAvailabilityText.textContent = "Please Enter a Valid Pincode";
    } else {
      const { deliveryLocations } = availablePincodes;

      const serviceableArea = deliveryLocations.find(
        (area) => area.pincode === pincode
      );

      if (serviceableArea === undefined) {
        this.pincodeAvailabilityText.textContent =
          "This area is not serviceable";
      } else {
        const todayDate = new Date();
        todayDate.setDate(
          todayDate.getDate() + serviceableArea.estimatedDeliveryDays
        );

        const dayName = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
        }).format(todayDate);

        const dayOfMonth = todayDate.getDate();

        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(todayDate);

        const deliveryDate = `Delivery date is: ${dayName}, ${dayOfMonth} ${monthName}`;

        this.pincodeAvailabilityText.classList.add("success-text");

        this.pincodeAvailabilityText.textContent = deliveryDate;
      }
    }
  }
}

customElements.define("pincode-check", PincodeCheck);
