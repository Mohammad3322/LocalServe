"use client";

import Link from "next/link";
import MyButton from "../ui/MyButton";
import MyInput from "../ui/MyInput";

function CustomerDetails() {
  return (
    <div>
      <div className="">
        <div>
          <h2>Your Details</h2>
          <p>Enter your information so the provider can contact you.</p>
        </div>
        <form className="flex flex-col gap-5">
          <MyInput aria-label="Full Name" />
          <MyInput />
          <MyInput />
          <MyInput />
          <div className="flex gap-5">
            <Link href="">
              <MyButton variant="secondary">Back</MyButton>
            </Link>

            <MyButton variant="primary" type="submit">
              Continue
            </MyButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerDetails;
