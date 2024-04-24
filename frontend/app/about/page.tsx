import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 my-8">
      <section className="w-full">
        <h1 className="text-2xl font-bold text-center pb-2">
          Project Overview
        </h1>
        <p>
          Welcome to foodbridge, where we bridge the gap between surplus food
          and those in need. Our web app is a platform designed to tackle food
          waste by empowering individuals and businesses to share their excess
          food with community members facing food insecurity.
        </p>
      </section>
      <Separator />
      <section className="w-full">
        <h1 className="text-2xl font-bold text-center pb-2">How it Works</h1>
        <h6 className="font-bold pt-2">1. Post Excess Food: </h6>
        <p>
          Anyone with surplus food can easily create a listing on our platform,
          describing the available food items and their location.
        </p>

        <h6 className="font-bold pt-2">2. Find and Claim Food: </h6>
        <p>
          Needy individuals can browse listings based on their location and
          dietary preferences, making it simple to find and claim the food they
          need.
        </p>
        <h6 className="font-bold pt-2">3. Reduce Food Waste: </h6>
        <p>
          By connecting surplus food with those who can use it, we are actively
          reducing food waste and making a positive impact on our environment
          and community.
        </p>
      </section>
      <Separator />

      <section className="w-full">
        <h1 className="text-2xl font-bold text-center pb-2">Key Features</h1>
        <ul className="list-disc">
          <li>
            User-friendly interface for posting and finding food listings.
          </li>
          <li>
            Advanced search filters for location, food type, and availability.
          </li>
          <li>
            Secure messaging system for communication between donors and
            recipients.
          </li>
          <li>
            Feedback and rating system to ensure transparency and
            accountability.
          </li>
          <li>Mobile-friendly design for easy access on the go.</li>
        </ul>
      </section>
      <Separator />
      <section className="w-full">
        <h1 className="text-2xl font-bold text-center pb-2">
          Join Us in Making a Difference
        </h1>
        <p>
          At foodbridge, we believe that every contribution counts towards a
          more sustainable and compassionate society. Join us in our mission to
          reduce food waste and support those in need. Together, we can create a
          healthier and more equitable food system for everyone.
        </p>
      </section>
    </div>
  );
}
